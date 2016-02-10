'use strict';

/**
 * @ngdoc function
 * @name reposePlaygroundApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the reposePlaygroundApp
 */
angular.module('reposePlaygroundApp')
  .controller('InternalCtrl', function ($scope, $log, ReposeService) {
    $log.info('In Internal Ctrl');
    $scope.ui = {
      waitingForLoad: true,
      reposeFetchError: false,
      isChildState: false
    };

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

    $scope.forceFetchInstances = function(){
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
    }


  })
  .controller('ConfigModalInstanceCtrl', function (ReposeService, $scope, $modalInstance, data, $log) {
    $log.info('inside config modal instance ctrl', data);
    $scope.configs = data.configs;
    $scope.ok = function () {
      $modalInstance.close($scope.status);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
