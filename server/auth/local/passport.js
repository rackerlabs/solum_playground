var passport = require('passport');
var request = require('request');
var LocalStrategy = require('passport-local').Strategy;
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');

exports.setup = function (User, config) {
  passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password' // this is the virtual field on the model
  },
    function (username, password, done) {
      User.findOne({
        username: username.toLowerCase()
      }, function (err, user) {
          if (err) return done(err);

          if (!user) {
            //user nat found.  make a request to identity and save this user
            var jsonObject = JSON.stringify({
              "auth": {
                "passwordCredentials": {
                  "username": username,
                  "password": password
                },
              }
            })
            var options = {
              url: 'https://identity.api.rackspacecloud.com/v2.0/tokens',
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(jsonObject, 'utf8')
              },
              body: jsonObject
            };
            request(options, function (error, response, body) {
              if (response !== undefined && error === null) {
                switch (response.statusCode) {
                  case 200:
                    console.log('response is good');
                    console.log(JSON.parse(body));
                    var newUser = new User({
                      username: username,
                      password: password,
                      raxToken: JSON.parse(body).access.token.id,
                      raxTokenExpiry: JSON.parse(body).access.token.expires,
                      raxTenant: JSON.parse(body).access.token.tenant.id,
                      catalog: JSON.parse(body).access.serviceCatalog
                    });
                    newUser.provider = 'local';
                    newUser.role = 'user';
                    newUser.save(function (userErr, user) {
                      if (userErr) return done(null, false, { message: userErr });
                      return done(null, newUser);
                    });
                    break
                  case 401:
                    return done(null, false, { message: 'Invalid credentials.' });
                  case 500:
                    return done(null, false, { message: 'Unable to authenticate at the moment.' });
                  default:
                    return done(null, false, { message: 'Invalid user name or password.' });
                }
              } else {
                return done(null, false, { message: 'Unable to authenticate at the moment.' });
              }
            })
          } else if (!user.authenticate(password)) {
            return done(null, false, { message: 'This password is not correct.' });
          } else {
            return done(null, user);  
          }
        });
    }
    ));
};