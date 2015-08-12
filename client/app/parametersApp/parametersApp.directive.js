'use strict';

angular.module('solumApp')
  .directive('parametersApp', function () {
  return {
    templateUrl: 'app/parametersApp/parametersApp.html',
    restrict: 'EA',
    link: function (scope, element, attrs) {
      scope.showParameters = function () {
        console.log('test')
        scope.checked = !scope.checked;
        //default
        scope.app.parameters = [{'id': 0, 'name': '', 'value': '', 'secret': false}];
      }
      scope.addVariable = function () {
        scope.app.parameters.push({'id': scope.app.parameters.length, 'name': '', 'value': '', 'secret': false});
      }
    }
  };
});