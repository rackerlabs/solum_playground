'use strict';

/**
 * @ngdoc service
 * @name reposePlaygroundApp.User
 * @description
 * # User
 * Factory in the reposePlaygroundApp.
 */
angular.module('reposePlaygroundApp')
  .factory('User', function ($resource, $log) {
    $log.info("In User service", $resource);
    return $resource('/app/auth');
  });
