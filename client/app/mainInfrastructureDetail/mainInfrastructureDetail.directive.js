'use strict';

angular.module('solumApp')
  .directive('mainInfrastructureDetail', function () {
    return {
      templateUrl: 'app/mainInfrastructureDetail/mainInfrastructureDetail.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });