'use strict';

angular.module('solumApp')
  .factory('App', function (Auth, $http, $q) {
  //var apps = [];

  // Public API here
  return {
    getApps: function (cb) {
      var authToken = Auth.getToken();
      $http.get('/api/apps', {
        authToken: authToken
      }).
        success(function (data) {
        return cb(data);
      }).
        error(function (err) {
        return cb(err);
      });
    },
    getAppDetail: function (id, cb) {
      var authToken = Auth.getToken();
      $http.get('/api/apps/' + id, {
        authToken: authToken
      }).
        success(function (data) {
        return cb(data);
      }).
        error(function (err) {
        return cb(err);
      });
    },
    create: function (app, cb) {
      var cb = cb || angular.noop;
      var deferred = $q.defer();
      $http.post('/api/apps?action=create', app).
        success(function (data) {
        deferred.resolve(data);
        return cb();
      }).
        error(function (err) {
        deferred.reject(err);
        return cb(err);
      }.bind(this));

      return deferred.promise;
    },
    deploy: function(app, cb) {
      var cb = cb || angular.noop;
      var deferred = $q.defer();
      $http.post('/api/apps?action=deploy', app).
        success(function (data) {
        console.log('success? let us get that data and show that awesome modal!')
        //$cookieStore.put('token', data.token);
        //currentUser = User.get();
        deferred.resolve(data);
        return cb();
      }).
        error(function (err) {
        deferred.reject(err);
        return cb(err);
      }.bind(this));

      return deferred.promise;
    },
    deleteApp: function(app, cb) {
      var cb = cb || angular.noop;
      var deferred = $q.defer();
      console.log('total' ,app, app.id, app.assembly_uuid)
      $http.delete('/api/apps/' + app.id).
        success(function (data) {
        console.log('success? let us get that data and show that awesome modal!')
        //$cookieStore.put('token', data.token);
        //currentUser = User.get();
        deferred.resolve(data);
        return cb();
      }).
        error(function (err) {
        deferred.reject(err);
        return cb(err);
      }.bind(this));

      return deferred.promise;
    }
  };
});
