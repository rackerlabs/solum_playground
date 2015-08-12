'use strict';

angular.module('solumApp')
  .directive('mainParameterDetail', function () {
    return {
      templateUrl: 'app/mainParameterDetail/mainParameterDetail.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });