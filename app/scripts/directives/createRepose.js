'use strict';

angular.module('reposePlaygroundApp')
  .directive('createRepose', function ($log, ReposeService) {
    return {
      templateUrl: 'views/createRepose.html',
      restrict: 'E',
      link: function (scope, element, attrs) {
        console.log('In create Repose: ', scope, element, attrs);
        scope.ui.VersionSelected = false;


        ReposeService.getVersions()
        .then(function(versions){
          cleanErrors();
          scope.repose.availableVersions = versions;
          $log.info('createRepose directive ReposeService.getVersions::got back repose versions: ', versions);
        })
        .catch(function(err){
          scope.ui.reposeFetchError = true;
          $log.error('createRepose directive ReposeService.getVersions::Got an error: ', err);

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
