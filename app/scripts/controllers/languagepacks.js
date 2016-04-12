'use strict';

/**
 * @ngdoc function
 * @name reposePlaygroundApp.controller:LangpackCtrl
 * @description
 * Controller of the reposePlaygroundApp
 */
angular.module('reposePlaygroundApp')
  .controller('LangpackCtrl', function ($scope, $log, ReposeService, $timeout, $rootScope, $interval) {
    $log.info('In Internal Ctrl');
    $scope.ui = {
      waitingForLoad: true,
      reposeFetchError: false,
      isChildState: false
    };

     // Flag to enable/disable page refresh
    $rootScope.mainPage = true;

    var stop_refresh = $interval(function() {
      ReposeService.getLanguagepacks()
        .then(function(reposes){
          $scope.ui.waitingForLoad = false;
          $scope.reposes = reposes;
          $log.info('LangpackCtrl ReposeService.getInstances::got back repose instances: ', reposes);
        })
        .catch(function(err){
          $scope.ui.waitingForLoad = false;
          $scope.ui.reposeFetchError = true;
          $log.error('LangpackCtrl ReposeService.getInstances::Got an error: ', err);
    
        });
      }, 3000);
    
    $scope.$on("$destroy", function() {
      if (angular.isDefined(stop_refresh)) {      
        $interval.cancel(stop_refresh);
        stop_refresh = undefined;
      }
    });  
  
    $scope.logout = function() {
      Auth.logout();
      $rootScope.mainPage = false;
      $location.path('/');
    }

    $scope.forceFetchInstances = function(){
      $scope.ui.waitingForLoad = true;
      $scope.ui.reposeFetchError = false;
      ReposeService.getInstances({
        uiStates: $scope.ui
      })
      .then(function(reposes){
        $scope.ui.waitingForLoad = false;
        $scope.ui.reposeFetchError = false;
        $scope.reposes = reposes;
        $log.info('LangpackCtrl ReposeService.getInstances::got back repose instances: ', reposes);
      })
      .catch(function(err){
        $scope.ui.waitingForLoad = false;
        $scope.ui.reposeFetchError = true;
        $log.error('LangpackCtrl ReposeService.getInstances::Got an error: ', err);

      });
    }


  })


