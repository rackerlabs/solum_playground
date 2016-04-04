'use strict';

angular.module('reposePlaygroundApp')
  .directive('showApp', function ($log, ReposeService, $modal) {
    return {
      templateUrl: 'views/showApp.html',
      restrict: 'E',
      scope: { appId: '@' },
      link: function (scope, element, attrs) {
        console.log('In Show Application: ', scope, element, attrs);
        
        scope.showLogDetails = function(data) {
          $log.info('show application: ', data);
          $modal.open({
            templateUrl: '/views/log_modal.html',
            backdrop: 'static',
            controller: 'LogModalInstanceCtrl',
            resolve: {
              header: function() {
                return 'Log file:' + data.location;
              },
              data: function() {
                return data;
              }
            }
          });
        }        

        ReposeService.getApp(scope.appId)
        .then(function(solumapp){
          cleanErrors();
          scope.solumapp = solumapp;
          scope.solumapp.raw_content = JSON.parse(solumapp.raw_content); 
          $log.info('showApp directive ReposeService.getApp::got back app details : ', solumapp);
        })
        .catch(function(err){
          $log.error('showApp directive ReposeService.getVersions::Got an error: ', err);

        });

        ReposeService.getAppLogs(scope.appId)
        .then(function(logs){
          cleanErrors();
          scope.logs = logs;
          $log.info('showApp directive ReposeService.getAppLogs::got back app logs  ');
        })
        .catch(function(err){
          $log.error('showApp directive ReposeService.getVersions::Got an error: ', err);

        });
        
        function cleanErrors(){
        }

      }
    };
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
  });
