'use strict';

/**
 * @ngdoc function
 * @name reposePlaygroundApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the reposePlaygroundApp
 */
angular.module('reposePlaygroundApp')
  .controller('CreateCtrl', function ($scope, $log, ReposeService, $filter) {
    $log.info('In Create Ctrl');
    $scope.ui = {
      waitingForLoad: false,
      reposeFetchError: false,
      isChildState: true,
      versionSelected: false,
      componentSelected: false
    };
    $scope.repose = {
      availableVersions: [],
      availableFilters: []
    };
    $scope.newInstance = {
      selectedFilters: []
    };

    function cleanErrors(){
      $scope.ui.errorMessage = "";
    }
  })
  .controller('ModalInstanceCtrl', function (ReposeService, $scope, $modalInstance, data, newInstance, $log) {
    $log.info('inside modal instance ctrl', newInstance, data);
    $scope.status = "building";
    ReposeService.createInstance(newInstance.version, data)
    .then(function(result){
      $log.info('ModalInstanceCtrl::',result);
      $scope.status = result.message;
    })
    .catch(function(err){
      $log.error('ModalInstanceCtrl::',err);
      $scope.status = 'error';
    });

    $scope.ok = function () {
      $modalInstance.close($scope.status);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
