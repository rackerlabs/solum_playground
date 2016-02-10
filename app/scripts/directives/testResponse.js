'use strict';

angular.module('reposePlaygroundApp')
  .directive('testResponse', function ($log, ReposeService) {
    return {
      templateUrl: 'views/testResponse.html',
      restrict: 'E',
      link: function (scope, element, attrs) {
        $log.info('In test Response: ', scope, element, attrs);
        scope.responses = []

        function showResponse() {
          $log.info('showResponse');
        }

        function cleanErrors(){
          scope.ui.errorMessage = "";
        }

      }
    };
  });
