'use strict';

/**
 * Directive that loads a special repose label
 */
angular.module('reposePlaygroundApp')
  .directive('reposeLabel', function ($log, $compile) {
    return {
      templateUrl: 'views/reposeLabel.html',
      restrict: 'E',
      link: function (scope, element, attrs) {
        $log.log('in repose label directive', scope, element, attrs);
        scope.value = attrs.value;
        scope.required = attrs.required;
        scope.doc = attrs.doc;
        scope.reposetitle = attrs.reposetitle;
        scope.prefix = attrs.prefix; //not used in prefix
      }
    };
  });
