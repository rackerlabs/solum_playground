'use strict';

angular.module('reposePlaygroundApp')
  .directive('createLanguagepack', function ($log, ReposeService) {
    return {
      templateUrl: 'views/createLanguagepack.html',
      restrict: 'E',
      link: function (scope, element, attrs) {
        console.log('In create Languagepack: ', scope, element, attrs);
        scope.ui.VersionSelected = false;

        function cleanErrors(){
          scope.ui.errorMessage = "";
        }

      }
    };
  });
