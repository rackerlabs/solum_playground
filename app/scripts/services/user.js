'use strict';

/**
 * @ngdoc service
 * @name reposePlaygroundApp.User
 * @description
 * # User
 * Factory in the reposePlaygroundApp.
 */
angular.module('reposePlaygroundApp')
  .factory('User', function ($resource) {
    return $resource(
      '/app/users/:id', 
      {id: '@_id'},
      {
        get: {
          method: 'GET',
          params: {
            id: 'me'
          }
        }
      });
  });
