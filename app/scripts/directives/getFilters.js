'use strict';

angular.module('reposePlaygroundApp')
  .directive('getFilters', function (ReposeService, $log, $compile) {
    return {
      templateUrl: 'views/getReposeFilters.html',
      restrict: 'E',
      link: function (scope, element, attrs) {
        console.log('in get repose filters directive', scope, element, attrs);

        scope.getFilters = function() {
          scope.ui.versionSelected = true;
          var versionId = scope.newInstance.version;
          $log.info(versionId);

          ReposeService.getFiltersByVersion(versionId)
          .then(function(filters){
            cleanErrors();
            scope.repose.availableFilters = filters;
            $log.info('getFilters directive ReposeService.getFiltersByVersion::got back repose filters ', filters, ' for : ', scope.newInstance.version);
          })
          .catch(function(err){
            $log.error('getFilters ReposeService.getFiltersByVersion::Got an error: ', err);
            $log.error('Set version select to false and empty available filters');

            scope.ui.versionSelected = false;
            scope.repose.availableFilters = [];
            scope.ui.errorMessage = "This version is not available";

          });

        };


        function cleanErrors(){
          scope.ui.errorMessage = "";
        }
      }
    };
  });
