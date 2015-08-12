'use strict';

angular.module('solumApp')
  .directive('mainAppStats', function () {
  return {
    templateUrl: 'app/mainAppStats/mainAppStats.html',
    restrict: 'EA',
    link: function (scope, element, attrs) {
    }
  };
});