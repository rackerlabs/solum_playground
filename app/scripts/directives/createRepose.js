'use strict';

angular.module('reposePlaygroundApp')
  .directive('createRepose', function ($log, ReposeService, $filter) {
    return {
      templateUrl: 'views/createRepose.html',
      restrict: 'E',
      link: function (scope, element, attrs) {
        console.log('In create Repose: ', scope, element, attrs);
        scope.ui.VersionSelected = false;
        scope.params = [];
        scope.param_count = 0;
        
        
        scope.addNewParam = function() {
          scope.params.push({param_name: '',  param_value: ''});
        }

        ReposeService.getLanguagepacks()
        .then(function(languagepacks){
          cleanErrors();
          scope.repose.availableLanguagepacks = $filter('filter')(languagepacks, {status: 'READY'});
          $log.info('createRepose directive ReposeService.getLanguagepacks::got back languagepacks: ', languagepacks);
        })
        .catch(function(err){
          scope.ui.reposeFetchError = true;
          $log.error('createRepose directive ReposeService.back::Got an error: ', err);
          scope.ui.errorMessage = err;
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
