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
    return $resource('/api/users/:id/:controller', {
      id: '@_id'
    },
      {
        changePassword: {
          method: 'PUT',
          params: {
            controller: 'password'
          }
        },
        get: {
          method: 'GET',
          params: {
            id: 'me'
          }
        }
      });
  });
