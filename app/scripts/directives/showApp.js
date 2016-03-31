'use strict';

angular.module('reposePlaygroundApp')
  .directive('showApp', function ($log, ReposeService) {
    return {
      templateUrl: 'views/showApp.html',
      restrict: 'E',
      scope: { appId: '@' },
      link: function (scope, element, attrs) {
        console.log('In Show Application: ', scope, element, attrs);
        //scope.ui.VersionSelected = false;


        ReposeService.getApp(scope.appId)
        .then(function(solumapp){
          cleanErrors();
          scope.solumapp = solumapp;
          scope.solumapp.raw_content = JSON.parse(solumapp.raw_content); 
          //scope.repose.availableVersions = versions;
          $log.info('showApp directive ReposeService.getApp::got back app details : ', solumapp);
        })
        .catch(function(err){
          //scope.ui.reposeFetchError = true;
          $log.error('showApp directive ReposeService.getVersions::Got an error: ', err);

        });


        function cleanErrors(){
          //scope.ui.errorMessage = "";
        }

      }
    };
  });
