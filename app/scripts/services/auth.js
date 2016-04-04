'use strict';

/**
 * @ngdoc service
 * @name reposePlaygroundApp.Auth
 * @description
 * # Auth
 * Service in the reposePlaygroundApp.
 */
angular.module('reposePlaygroundApp')
  .factory('Auth', function Auth($location, $rootScope, $http, User, $cookieStore, $q, $log) {
    $log.info('In Auth factory')
    var currentUser = {};
    $log.info('Check token in cookie store: ', $cookieStore.get('token'))
    if($cookieStore.get('token')) {
      $log.info('We have a token', $cookieStore.get('token'))
      currentUser = User.get();
    }

    return {

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      login: function(user, callback) {
        $log.info('In Auth.login().  Try to login with: ', user);
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.post('app/auth', {
          username: user.username,
          password: user.password
        }).
        success(function(data) {
          $log.info('Auth.login()::Got back a "successful" response with: ', data);
          $cookieStore.put('token', data.token);
          $cookieStore.put('username', user.username);
          $cookieStore.put('apikey', data.apikey);
          $cookieStore.put('cloud_files_url', data.cloud_files_url);
          currentUser = User.get();
          deferred.resolve(data);
          return cb();
        }).
        error(function(err) {
          $log.error('Auth.login()::Got back a "failed" response with: ', err);
          this.logout();
          deferred.reject(err);
          return cb(err);
        }.bind(this));

        return deferred.promise;
      },

      /**
       * Delete access token and user info
       *
       * @param  {Function}
       */
      logout: function() {
        $log.info('In Auth.logout().  Remove token from cookie store');
        $cookieStore.remove('token');
        $cookieStore.remove('username');
        $cookieStore.remove('apikey');
        $cookieStore.remove('cloud_files_url');
        currentUser = {};
      },

      /**
       * Gets all available info on authenticated user
       *
       * @return {Object} user
       */
      getCurrentUser: function() {
        $log.info('In Auth.getCurrentUser().  Get current user: ', currentUser);
        return currentUser;
      },


      /**
       * Check if a user is logged in
       *
       * @return {Boolean}
       */
      isLoggedIn: function() {
        $log.info('In Auth.isLoggedIn().  Get current user: ', currentUser, 'Check if there is a role assigned to it: ', currentUser.hasOwnProperty('role'));
        return currentUser.hasOwnProperty('role');
      },

      /**
       * Waits for currentUser to resolve before checking if user is logged in
       */
      isLoggedInAsync: function(cb) {
        $log.info('In Auth.isLoggedInAsync(). Current user: ', currentUser);
        if(currentUser.hasOwnProperty('$promise')) {
          $log.info('Auth.isLoggedInAsync()::Current user has a promise property, which means we need to go check if user info is valid and current: ', currentUser.hasOwnProperty('$promise'));
          currentUser.$promise.then(function() {
            $log.info('Auth.isLoggedInAsync()::Login async call succeeded.  Callback.');
            cb(true);
          }).catch(function() {
            $log.error('Auth.isLoggedInAsync()::Login async call failed.  Callback.');
            cb(false);
          });
        } else if(currentUser.hasOwnProperty('role')) {
          $log.info('Auth.isLoggedInAsync()::Current user has a role property, which means we do not need to go check if user info is valid and current: ', currentUser.hasOwnProperty('role'));
          cb(true);
        } else {
          $log.error('Auth.isLoggedInAsync()::Current user does not have role or $promise.  Fail out: ', currentUser);
          cb(false);
        }
      },

      /**
       * Check if a user is an admin
       *
       * @return {Boolean}
       */
      isAdmin: function() {
        return currentUser.role === 'admin';
      },

      /**
       * Get auth token
       */
      getToken: function() {
        return $cookieStore.get('token');
      }

    };
  });
