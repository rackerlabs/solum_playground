'use strict';

/**
 * @ngdoc function
 * @name reposePlaygroundApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the reposePlaygroundApp
 */
angular.module('reposePlaygroundApp')
  .controller('InternalCtrl', function ($scope, $log, ReposeService, $timeout, $rootScope, $interval) {
    $log.info('In Internal Ctrl');
    $scope.ui = {
      waitingForLoad: true,
      reposeFetchError: false,
      isChildState: false
    };

     // Flag to enable/disable page refresh
    $rootScope.mainPage = true;

    var stop_refresh = $interval(function() {
      ReposeService.getInstances({
          uiStates: $scope.ui
        })
        .then(function(reposes){
          $scope.ui.waitingForLoad = false;
          $scope.reposes = reposes;
          $log.info('InternalCtrl ReposeService.getInstances::got back repose instances: ', reposes);
        })
        .catch(function(err){
          $scope.ui.waitingForLoad = false;
          $scope.ui.reposeFetchError = true;
          $log.error('InternalCtrl ReposeService.getInstances::Got an error: ', err);
    
        });
      },  3000);
  
    $scope.$on("$destroy", function() {
      if (angular.isDefined(stop_refresh)) {      
        $interval.cancel(stop_refresh);
        stop_refresh = undefined;
      }
    });
  
    $scope.logout = function() {
    console.log("Hello,world");
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
        $log.info('InternalCtrl ReposeService.getInstances::got back repose instances: ', reposes);
      })
      .catch(function(err){
        $scope.ui.waitingForLoad = false;
        $scope.ui.reposeFetchError = true;
        $log.error('InternalCtrl ReposeService.getInstances::Got an error: ', err);

      });
    }


  })
  .controller('ScaleModalInstanceCtrl', function (ReposeService, $scope, $modalInstance, repose, FileSaver, $log) {
    $log.info('inside config modal instance ctrl', repose);
    $scope.configsLoading = true;
    $scope.configsLoaded = false;
    $scope.configsErrored = false;
    $scope.target_instance_count = "";
    $scope.scale_data = {}

    ReposeService.getApp(repose.id)
    .then(function(data){
      $scope.app = data;
      $scope.appLoading = false;
      $scope.appLoaded = true;
      $scope.appErrored = false;
    })
    .catch(function(err){
      $scope.app = data;
      $scope.appLoading = false;
      $scope.appLoaded = false;
      $scope.appErrored = true;
      scope.errorMessage = err;
      $log.error('ReposeCards ReposeService.viewConfiguration::Got an error: ', err);

    });

    $scope.ok = function () {
      $modalInstance.close($scope.status);
    };

    $scope.dismiss = function () {
      $log.info("dismissed");
      $modalInstance.dismiss('cancel');
    };

    $scope.scale = function() {
    $scope.scale_data = {
     "app_id" : $scope.app.id,
     "scale_target": $scope.target_instance_count     
    }

    ReposeService.scaleApp(JSON.stringify($scope.scale_data))
        .then(function(result){
      $log.info('ScaleModalInstanceCtrl::',result);
      $scope.status = result.message;
      $scope.app.id = result.id;
      $modalInstance.dismiss('cancel');
    })
    .catch(function(err){
      $log.error('ScaleModalInstanceCtrl::',err);
      $scope.status = 'error';
      alert(err);
    });
    };
    
  });
