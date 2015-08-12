'use strict';

angular.module('solumApp')
  .directive('mainApp', function (LanguagePack) {
    return {
      templateUrl: 'app/mainApp/mainApp.html',
      restrict: 'E',
      link: function (scope, element, attrs) {
        //TODO: get this user's language packs here
        LanguagePack.getLanguagePacks(function(data){
          console.log(data);
          scope.language_packs = data;
        });
      }
    };
  });