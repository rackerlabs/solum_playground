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
      },

      /**
       * Retrieve all repose versions
       *
       * @return {Promise}
       */
      getVersions: function(callback) {
        $log.info('In ReposeService.getVersions().  Try to retrieve');
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.get('app/versions').
        success(function(data) {
          $log.info('ReposeService.getVersions()::Got back a "successful" response with: ', data);
          deferred.resolve(data);
          return cb();
        }).
        error(function(err) {
          $log.error('ReposeService.getVersions()::Got back a "failed" response with: ', err);
          deferred.reject(err);
          return cb(err);
        }.bind(this));

        return deferred.promise;
      },

      /**
       * Retrieve all repose filters for a version
       *
       * @param  {Object}   versionId     - versionId
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      getFiltersByVersion: function(versionId, callback) {
       $log.info('In ReposeService.getFiltersByVersion().  Try to retrieve for: ', versionId);
       var cb = callback || angular.noop;
       var deferred = $q.defer();

       $http.get('app/versions/' + versionId + '/components').
       success(function(data) {
         $log.info('ReposeService.getFiltersByVersion()::Got back a "successful" response with: ', data);
         deferred.resolve(data);
         return cb();
       }).
       error(function(err) {
         $log.error('ReposeService.getFiltersByVersion()::Got back a "failed" response with: ', err);
         deferred.reject(err);
         return cb(err);
       }.bind(this));

       return deferred.promise;
     },

      /**
       * Retrieve repose component by component name and version id
       *
       * @param  {Object}   versionId     - versionId
       * @param  {Object}   componentName - componentName
       * @param  {Function} callback - optional
       * @return {Promise}
       */
     getComponents: function(versionId, componentName, callback){
       $log.info('In ReposeService.getComponents().  Try to retrieve for: ', versionId, componentName);
       var cb = callback || angular.noop;
       var deferred = $q.defer();

       $http.get('/app/versions/' + versionId + '/components/' + componentName).
       success(function(data) {
         $log.info('ReposeService.getComponents()::Got back a "successful" response with: ', data);
         deferred.resolve(data);
         return cb();
       }).
       error(function(err) {
         $log.error('ReposeService.getComponents()::Got back a "failed" response with: ', err);
         deferred.reject(err);
         return cb(err);
       }.bind(this));

       return deferred.promise;
     },

     /**
      * Create new repose instance based on specified version and data
      *
      * @param {Object} versionId - versionId
      * @param {Object} data - json representation of entered values
      * @param {Function} callback - optional
      * @return {Promise}
      */
     createInstance: function(versionId, data, callback) {
       $log.info('In ReposeService.createInstance().  Try to insert for: ', versionId, data);
       var cb = callback || angular.noop;
       var deferred = $q.defer();

       $http.post('/app/versions/' + versionId, data).
       success(function(resp){
         $log.info('ReposeService.createInstance()::Got back a "successful" response with: ', resp);
         deferred.resolve(resp)
         return cb();
       }).
       error(function(err) {
        $log.error('ReposeService.createInstance()::Got back a "failed" response with: ', err);
        deferred.reject(err);
        return cb(err);
      }.bind(this));

       return deferred.promise;
     },

     stopInstance: function(id, callback) {
      $log.info('In ReposeService.stopInstance().  Try to remove: ', id);
      var cb = callback || angular.noop;
      var deferred = $q.defer();

      $http.get('/app/repose/stop/' + id).
      success(function(resp){
        $log.info('ReposeService.stopInstance()::Got back a "successful" response with: ', resp);
        deferred.resolve(resp)
        return cb();
      }).
      error(function(err) {
       $log.error('ReposeService.stopInstance()::Got back a "failed" response with: ', err);
       deferred.reject(err);
       return cb(err);
     }.bind(this));

      return deferred.promise;
    },


  getLanguagepacks: function(callback) {
        $log.info('In ReposeService.getLanguagepacks().  Try to retrieve');
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.get('/app/language_packs').
        success(function(data) {
          $log.info('ReposeService.getLanguagepacks()::Got back a "successful" response with: ', data);
          deferred.resolve(data);
          return cb();
        }).
        error(function(err) {
          $log.error('ReposeService.getLanguagepacks()::Got back a "failed" response with: ', err);
          deferred.reject(err);
          return cb(err);
        }.bind(this));

        return deferred.promise;
      },
      
  
getApp: function(id, callback) {
      $log.info('In ReposeService.getApp().  Try to remove: ', id);
      var cb = callback || angular.noop;
      var deferred = $q.defer();

      $http.get('/app/repose/show/' + id).
      success(function(resp){
        $log.info('ReposeService.getApp)::Got back a "successful" response with: ', resp);
        deferred.resolve(resp)
        return cb();
      }).
      error(function(err) {
       $log.error('ReposeService.getApp()::Got back a "failed" response with: ', err);
       deferred.reject(err);
       return cb(err);
     }.bind(this));

      return deferred.promise;
    },

getHostname: function(callback) {
      $log.info('In ReposeService.getHostname().');
      var cb = callback || angular.noop;
      var deferred = $q.defer();

      $http.get('/app/hostname').
      success(function(resp){
        $log.info('ReposeService.getHostname)::Got back a "successful" response with: ', resp);
        deferred.resolve(resp)
        return cb();
      }).
      error(function(err) {
       $log.error('ReposeService.getHostname()::Got back a "failed" response with: ', err);
       deferred.reject(err);
       return cb(err);
     }.bind(this));

      return deferred.promise;
    },
    
getLanguagepackLogs: function(id, callback) {
      $log.info('In ReposeService.getLanguagepackLogs().  Try to remove: ', id);
      var cb = callback || angular.noop;
      var deferred = $q.defer();

      $http.get('/app/language_packs/logs/' + id).
      success(function(resp){
        $log.info('ReposeService.getLanguagepackLogs()::Got back a "successful" response with: ', resp);
        deferred.resolve(resp)
        return cb();
      }).
      error(function(err) {
       $log.error('ReposeService.getAppLogs()::Got back a "failed" response with: ', err);
       deferred.reject(err);
       return cb(err);
     }.bind(this));

      return deferred.promise;
    },
    
getAppLogs: function(id, callback) {
      $log.info('In ReposeService.getAppLogs().  Try to remove: ', id);
      var cb = callback || angular.noop;
      var deferred = $q.defer();

      $http.get('/app/repose/logs/' + id).
      success(function(resp){
        $log.info('ReposeService.getAppLogs()::Got back a "successful" response with: ', resp);
        deferred.resolve(resp)
        return cb();
      }).
      error(function(err) {
       $log.error('ReposeService.getAppLogs()::Got back a "failed" response with: ', err);
       deferred.reject(err);
       return cb(err);
     }.bind(this));

      return deferred.promise;
    },
  
  getLogFile: function(path, callback) {
      $log.info('In ReposeService.getLogFile().  Try to remove: ', path);
      var cb = callback || angular.noop;
      var deferred = $q.defer();

      $http.get('/app/repose/logs/show/' + path).
      success(function(resp){
        $log.info('ReposeService.getLogFile()::Got back a "successful" response with: ', resp);
        deferred.resolve(resp)
        return cb();
      }).
      error(function(err) {
       $log.error('ReposeService.getLogFile()::Got back a "failed" response with: ', err);
       deferred.reject(err);
       return cb(err);
     }.bind(this));

      return deferred.promise;
    },
    
     createApp: function(data, callback) {
      $log.info('In ReposeService.createApp().');
      var cb = callback || angular.noop;
      var deferred = $q.defer();

      $http.post('/app/repose/create/', data).
      success(function(resp){
        $log.info('ReposeService.createApp)::Got back a "successful" response with: ', resp);
        deferred.resolve(resp)
        return cb();
      }).
      error(function(err) {
       $log.error('ReposeService.createApp()::Got back a "failed" response with: ', err);
       deferred.reject(err);
       return cb(err);
     }.bind(this));

      return deferred.promise;
    },


     deployApp: function(id, data, callback) {
      $log.info('In ReposeService.deployApp().  Try to remove: ', id);
      var cb = callback || angular.noop;
      var deferred = $q.defer();

      $http.post('/app/repose/deploy/' + id + '/workflows', data).
      success(function(resp){
        $log.info('ReposeService.deployApp)::Got back a "successful" response with: ', resp);
        deferred.resolve(resp)
        return cb();
      }).
      error(function(err) {
       $log.error('ReposeService.deployApp()::Got back a "failed" response with: ', err);
       deferred.reject(err);
       return cb(err);
     }.bind(this));

      return deferred.promise;
    },

     scaleApp: function(data, callback) {
      $log.info('In ReposeService.scaleApp().');
      var cb = callback || angular.noop;
      var deferred = $q.defer();

      $http.post('/app/repose/scale/', data).
      success(function(resp){
        $log.info('ReposeService.scaleApp)::Got back a "successful" response with: ', resp);
        deferred.resolve(resp)
        return cb();
      }).
      error(function(err) {
       $log.error('ReposeService.scaleApp()::Got back a "failed" response with: ', err);
       deferred.reject(err);
       return cb(err);
     }.bind(this));

      return deferred.promise;
    },
    
    createGithubWebhook: function(data, callback) {
      $log.info('In ReposeService.scaleApp().');
      var cb = callback || angular.noop;
      var deferred = $q.defer();

      $http.post('/app/repose/webhook/', data).
      success(function(resp){
        $log.info('ReposeService.scaleApp)::Got back a "successful" response with: ', resp);
        deferred.resolve(resp)
        return cb();
      }).
      error(function(err) {
       $log.error('ReposeService.scaleApp()::Got back a "failed" response with: ', err);
       deferred.reject(err);
       return cb(err);
     }.bind(this));

      return deferred.promise;
    },
    
    createLanguagepack: function(data, callback) {
      $log.info('In ReposeService.createLanguagepack(). ');
      var cb = callback || angular.noop;
      var deferred = $q.defer();

      $http.post('/app/language_packs', data).
      success(function(resp){
        $log.info('ReposeService.createLanguagepack::Got back a "successful" response with: ', resp);
        deferred.resolve(resp)
        return cb();
      }).
      error(function(err) {
       $log.error('ReposeService.createLanguagepack()::Got back a "failed" response with: ', err);
       deferred.reject(err);
       return cb(err);
     }.bind(this));

      return deferred.promise;
    },

     deleteInstance: function(id, callback) {
      $log.info('In ReposeService.deleteInstance().  Try to remove: ', id);
      var cb = callback || angular.noop;
      var deferred = $q.defer();

      $http.delete('/app/repose/delete/' + id).
      success(function(resp){
        $log.info('ReposeService.deleteInstance()::Got back a "successful" response with: ', resp);
        deferred.resolve(resp)
        return cb();
      }).
      error(function(err) {
       $log.error('ReposeService.deleteInstance()::Got back a "failed" response with: ', err);
       deferred.reject(err);
       return cb(err);
     }.bind(this));

      return deferred.promise;
    },
    
    deleteLP: function(id, callback) {
      $log.info('In ReposeService.deleteLP().  Try to remove: ', id);
      var cb = callback || angular.noop;
      var deferred = $q.defer();

      $http.delete('/app/language_packs/delete/' + id).
      success(function(resp){
        $log.info('ReposeService.deleteLP()::Got back a "successful" response with: ', resp);
        deferred.resolve(resp)
        return cb();
      }).
      error(function(err) {
       $log.error('ReposeService.deleteLP()::Got back a "failed" response with: ', err);
       deferred.reject(err);
       return cb(err);
     }.bind(this));

      return deferred.promise;
    },
    
    startInstance: function(id, callback) {
     $log.info('In ReposeService.startInstance().  Try to start: ', id);
     var cb = callback || angular.noop;
     var deferred = $q.defer();

     $http.get('/app/repose/start/' + id).
     success(function(resp){
       $log.info('ReposeService.startInstance()::Got back a "successful" response with: ', resp);
       deferred.resolve(resp)
       return cb();
     }).
     error(function(err) {
      $log.error('ReposeService.startInstance()::Got back a "failed" response with: ', err);
      deferred.reject(err);
      return cb(err);
    }.bind(this));

     return deferred.promise;
   },


     /**
      * View repose configurations in xml
      *
      * @param {Object} reposeId - reposeId
      * @param {Function} callback - optional
      * @return {Promise}
      */
     viewConfiguration: function(reposeId, callback) {
       $log.info('In ReposeService.viewConfiguration().  Try to get configs for: ', reposeId);
       var cb = callback || angular.noop;
       var deferred = $q.defer();

       $http.get('/app/repose/' + reposeId + '/configurations').
       success(function(resp){
         $log.info('ReposeService.viewConfiguration()::Got back a "successful" response with: ', resp);
         deferred.resolve(resp)
         return cb();
       }).
       error(function(err) {
        $log.error('ReposeService.viewConfiguration()::Got back a "failed" response with: ', err);
        deferred.reject(err);
        return cb(err);
      }.bind(this));

       return deferred.promise;
     },

    makeRequest: function(id, data, callback) {
       $log.info('In ReposeService.makeRequest().  Try to insert for: ', id, data);
       var cb = callback || angular.noop;
       var deferred = $q.defer();

       $http.post('/app/repose/test/' + id, data).
       success(function(resp){
         $log.info('ReposeService.makeRequest()::Got back a "successful" response with: ', resp);
         deferred.resolve(resp)
         return cb();
       }).
       error(function(err) {
        $log.error('ReposeService.makeRequest()::Got back a "failed" response with: ', err);
        deferred.reject(err);
        return cb(err);
      }.bind(this));

       return deferred.promise;
     }
    };
  });
