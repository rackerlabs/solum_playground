'use strict';

/**
 * @ngdoc function
 * @name reposePlaygroundApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the reposePlaygroundApp
 */
angular.module('reposePlaygroundApp')
  .controller('CreateCtrl', function ($scope, $log, ReposeService,
   $cookieStore, $filter, $stateParams, $location, flashservice, $rootScope) {
    $log.info('In Create Ctrl', $stateParams);
    $scope.app_id = $stateParams.app_id
    $scope.ui = {
      waitingForLoad: false,
      reposeFetchError: false,
      isChildState: true,
      versionSelected: false,
      componentSelected: false
    };
    $scope.apikey = $cookieStore.get('apikey');
    $scope.username = $cookieStore.get('username');
    $rootScope.mainPage = false;
    $scope.flashservice = flashservice;
    $scope.message = "Hello,world";
    $scope.repose = {
      availableVersions: [],
      availableFilters: []
    };
    $scope.newInstance = {
      selectedFilters: []
    };
    
    $scope.app = {
    }
    
    $scope.lp_name = "";
    $scope.lp = {
    };

    $scope.createAlert = function() {
    flashservice.setMessage("Hello,world");
    };
    
    $scope.createApplication = function() {
      if ($scope.createForm.$valid) {
        cleanErrors();
      }
      else {
        $scope.ui.errorMessage = "Some input data is not valid.";
        return;
      }
    $scope.app['lp_name'] = $scope.lp_name.name;
    $scope.app['username'] = $scope.username;
    $scope.app['apikey'] = $scope.apikey;
    
    $scope.app['user_params'] = {};   
    angular.forEach($scope.params, function(value, key) {
      $scope.app['user_params'][value.param_name] = value.param_value;
    });
    
    var deploy_data = {"actions": ["build", "deploy"]}
    if ($scope.app.test_cmd) {
      deploy_data = {"actions": ["unittest", "build", "deploy"]}
    }
    ReposeService.createApp(JSON.stringify($scope.app))
        .then(function(result){
      $log.info('CreateCtrl::',result);
      $scope.status = result.message;
      $scope.app.id = result.id;
      if (result.faultstring) {
        $scope.ui.errorMessage = result.faultstring;
        return;
      }
      cleanErrors();      
      // Now deploy the app
      ReposeService.deployApp(result.id, JSON.stringify(deploy_data))
      .then(function(result){
      $log.info('CreateCtrl::',result);
      if (result.faultstring) {
        $scope.ui.errorMessage = result.faultstring;
        return;
      }
      cleanErrors();      
      flashservice.setMessage("created");
      $location.path('/main');
    })
    .catch(function(err){
      $log.error('CreateCtrl::',err);
      $scope.status = 'error';
      alert(err);
    });
    })
    .catch(function(err){
      $log.error('CreateCtrl::',err);
      $scope.status = 'error';
      alert(err);
    });
    }
    
    $scope.lp.name = '';
    $scope.$watch('lp.name',  function() {
        $scope.lp.name = $scope.lp.name.toLowerCase();
  });
  
    $scope.createLanguagepack = function() {
        ReposeService.createLanguagepack(JSON.stringify($scope.lp))
        .then(function(result){
      $log.info('CreateCtrl::',result);
      if (result.faultstring) {
        $scope.ui.errorMessage = result.faultstring;
        return;
      }
      cleanErrors();
      $scope.status = result.message;
      $scope.app.id = result.id;
      $location.path('/languagepacks');
    })
    .catch(function(err){
      $log.error('CreateCtrl::',err);
      $scope.status = 'error';
      alert(err);
    });
    }
    
    function cleanErrors(){
      $scope.ui.errorMessage = "";
    }
  })
  .filter('split', function() {
        return function(input) {
            // do some bounds checking here to ensure it has that index
            return input.split('/')[1];
        }
    })
  .controller('ModalInstanceCtrl', function (ReposeService, $scope, $modalInstance, data, newInstance, $log, $location) {
    $log.info('inside modal instance ctrl', newInstance, data);
    $scope.status = "building";
    $scope.isUploading = false;
    ReposeService.createInstance(newInstance.version, data)
    .then(function(result){
      $log.info('ModalInstanceCtrl::',result);
      $scope.status = result.message;
      $scope.reposeId = result.id;
    })
    .catch(function(err){
      $log.error('ModalInstanceCtrl::',err);
      $scope.status = 'error';
    });

    /*$scope.ok = function () {
      $modalInstance.close($scope.status, $scope.reposeId);
    };*/

    $scope.ok = function () {
      $log.info("get ok", $scope.status, $scope.reposeId)
      $modalInstance.close();
      if($scope.status === "success") {
        $location.path("/test/" + $scope.reposeId);
      }
    };


    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  })
  .controller('UploadModalInstanceCtrl', function (Upload, $scope, $modalInstance, file, newInstance, $log, $location) {
    $log.info('inside modal instance ctrl', newInstance, file);
    $scope.status = "building";
    $scope.isUploading = true;
    $scope.progressPercentage = 0;
    Upload.upload({
        url: 'app/repose/' + newInstance.version + '/upload',
        data: {file: file}
    }).then(function (resp) {
        $scope.status = resp.data.message;
        $scope.reposeId = resp.data.id;
        $log.info('Success ', resp.config.data.file.name, 'uploaded. Response: ', resp);
    }, function (resp) {
        $log.log('Error status: ' + resp.status);
        $scope.status = 'error';
    }, function (evt) {
        $scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        $log.log('progress: ' + $scope.progressPercentage + '% ' + evt.config.data.file.name);
    });

    $scope.ok = function () {
      $log.info("get ok", $scope.status, $scope.reposeId)
      $modalInstance.close();
      if($scope.status === "success") {
        $location.path("/test/" + $scope.reposeId);
      }
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
