'use strict';

angular.module('reposePlaygroundApp')
  .directive('createRepose', function ($log, ReposeService) {
    return {
      templateUrl: 'views/createRepose.html',
      restrict: 'E',
      link: function (scope, element, attrs) {
        console.log('In create Repose: ', scope, element, attrs);
        scope.ui.VersionSelected = false;


        ReposeService.getLanguagepacks()
        .then(function(languagepacks){
          cleanErrors();
          scope.repose.availableLanguagepacks = languagepacks;
          $log.info('createRepose directive ReposeService.getVersions::got back languagepacks: ', languagepacks);
        })
        .catch(function(err){
          scope.ui.reposeFetchError = true;
          $log.error('createRepose directive ReposeService.getVersions::Got an error: ', err);

        });

        scope.selectLanguagepack = function(){
          scope.ui.LanguagepackSelected = true;
        }

        scope.selectVersion = function(){
          scope.ui.VersionSelected = true;
        }

        function cleanErrors(){
          scope.ui.errorMessage = "";
        }

      }
    };
  });
