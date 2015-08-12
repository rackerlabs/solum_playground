'use strict';

angular.module('solumApp')
  .directive('mainCodeDetail', function () {
    return {
      templateUrl: 'app/mainCodeDetail/mainCodeDetail.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });