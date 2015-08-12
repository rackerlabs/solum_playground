'use strict';

angular.module('solumApp')
  .directive('appCard', function () {
    return {
      templateUrl: 'app/appCard/appCard.html',
      restrict: 'EA',
      scope: {
        app: '='
      },
      link: function (scope, element, attrs) {
      }
    };
  });