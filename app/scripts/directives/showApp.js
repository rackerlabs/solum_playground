'use strict';

angular.module('reposePlaygroundApp')
  .directive('showApp', function ($log, ReposeService) {
    return {
      templateUrl: 'views/showApp.html',
      restrict: 'E',
      link: function (scope, element, attrs) {
        console.log('In Show Application: ', scope, element, attrs);
        scope.ui.VersionSelected = false;


        ReposeService.getVersions()
        .then(function(versions){
          cleanErrors();
          scope.repose.availableVersions = versions;
          $log.info('showApp directive ReposeService.getVersions::got back repose versions: ', versions);
        })
        .catch(function(err){
          scope.ui.reposeFetchError = true;
          $log.error('showApp directive ReposeService.getVersions::Got an error: ', err);

        });

        scope.selectVersion = function(){
          scope.ui.VersionSelected = true;
        }

        function cleanErrors(){
          scope.ui.errorMessage = "";
        }

      }
    };
  });
