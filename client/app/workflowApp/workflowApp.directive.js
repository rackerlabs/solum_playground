'use strict';

angular.module('solumApp')
  .directive('workflowApp', function () {
    return {
      templateUrl: 'app/workflowApp/workflowApp.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });