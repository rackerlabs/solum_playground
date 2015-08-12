'use strict';

angular.module('solumApp')
  .controller('InternalCtrl', function ($scope) {
    /**
     * Check if authenticated.
     * If auth'ed, check if has any apps
     * If has apps, redirect to /apps
     * If doesn't have apps, redirect to /get_started
     * If not auth'ed, redirect to /login
     */
    $scope.message = 'Hello';
  });
