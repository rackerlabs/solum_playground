'use strict';

angular.module('solumApp')
  .directive('getStarted', function () {
    return {
      templateUrl: 'app/getStarted/getStarted.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });