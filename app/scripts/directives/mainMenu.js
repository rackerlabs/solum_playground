'use strict';

angular.module('reposePlaygroundApp')
  .directive('mainMenu', function (Auth, $location) {
    return {
      templateUrl: 'views/mainMenu.html',
      restrict: 'E',
      link: function (scope, element, attrs) {
        console.log(scope, element, attrs);
        scope.logout = function() {
          Auth.logout();
          $location.path('/');
        }
      }
    };
  });
