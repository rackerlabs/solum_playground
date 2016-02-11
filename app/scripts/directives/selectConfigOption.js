'use strict';

angular.module('reposePlaygroundApp')
  .directive('selectConfigOption', function ($log, ReposeService) {
    return {
      templateUrl: 'views/selectConfigOption.html',
      restrict: 'E',
      link: function (scope, element, attrs) {
        console.log('In select config option for Repose: ', scope, element, attrs);


        scope.selectConfigOption = function(){
          scope.ui.UploadConfigsSelected = false;
          scope.ui.BuildOwnReposeSelected = false;
          $log.info('config options', scope.newInstance.configOption);
          if(scope.newInstance.configOption === 'build'){
            $log.info('build own repose');
            scope.ui.BuildOwnReposeSelected = true;
            scope.getFilters();
          } else {
            scope.ui.UploadConfigsSelected = true;
            $log.info('upload configs');
          }
        }

        function cleanErrors(){
          scope.ui.errorMessage = "";
        }

      }
    };
  });
