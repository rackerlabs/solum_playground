'use strict';

/**
 * @ngdoc service
 * @name reposePlaygroundApp.ReposeService
 * @description
 * # Auth
 * Service in the reposePlaygroundApp.
 */
angular.module('reposePlaygroundApp')
  .factory('ReposeService', function ReposeService($location, Auth, User, $rootScope, $http, $q, $log) {
    $log.info('In ReposeService factory');

    var currentUser = {};
    $log.info('ReposeService::Check token in cookie store: ', Auth.getToken())
    if(Auth.getToken()) {
      $log.info('ReposeService::We have a token', Auth.getToken());
      currentUser = User.get();
    }

    return {

      /**
       * Retrieve all repose instances for this user
       *
       * @param  {Object}   uiStates     - uiStates
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      getInstances: function(uiStates, callback) {
        $log.info('In ReposeService.getInstances().  Try to retrieve for: ', currentUser);
        var cb = callback || angular.noop;
        var deferred = $q.defer();
		
        if(currentUser === undefined) {
              this.logout();
              deferred.reject('ReposeService.getInstances()::Not logged in');
              return cb('ReposeService.getInstances()::Not logged in');
        }

        $http.get('app/repose/list').
        success(function(data) {
          $log.info('ReposeService.getInstances()::Got back a "successful" response with: ', data);
          deferred.resolve(data);
          return cb();
        }).
        error(function(err) {
          $log.error('ReposeService.getInstances()::Got back a "failed" response with: ', err);
          deferred.reject(err);
          return cb(err);
        }.bind(this));

        return deferred.promise;
      }
      
    };
  });
