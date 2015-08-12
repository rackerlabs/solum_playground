'use strict';

angular.module('solumApp')
  .directive('mainAppDetail', function () {
    return {
      templateUrl: 'app/mainAppDetail/mainAppDetail.html',
      restrict: 'E',
      link: function (scope, element, attrs) {
        scope.language_packs = [
            {
              'name': 'Python 2.7',
              'id': '1'
            },
            {
              'name': 'NodeJS 0.10.38',
              'id': '2'
            },
            {
              'name': 'Ruby 2.1.2',
              'id': '3'
            },
            {
              'name': 'Java 7.0.53',
              'id': '4'
            },
            {
              'name': 'Auto',
              'id': 'auto'
            }
          ];
      }
    };
  });