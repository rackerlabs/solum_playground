'use strict';

angular.module('solumApp')
  .directive('mainMenu', function (Auth, $location) {
    return {
      templateUrl: 'app/mainMenu/mainMenu.html',
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