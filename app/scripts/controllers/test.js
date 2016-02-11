'use strict';

/**
 * @ngdoc function
 * @name reposePlaygroundApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the reposePlaygroundApp
 */
angular.module('reposePlaygroundApp')
  .controller('TestCtrl', function ($scope, $log, $modal, $filter, $stateParams, ReposeService) {
    $log.info('In Test Ctrl', $scope, $stateParams);
    $scope.id = $stateParams.repose_id;
    $scope.responses = [];
    $scope.requestLoading = false;
    $scope.requestLoaded = true;
    $scope.requestErrored = false;



    $scope.testReposeInstance = function() {
      $log.info('Make request');
      $scope.requestLoading = true;
      $scope.requestLoaded = false;
      $scope.requestErrored = false;
      $scope.request = {
        url: '',
        headers: [],
        body: '',
        method: ''
      };
      $scope.request.url = $("#testReposeForm").find(':input[name="url"]').val();
      $scope.request.method = $("#testReposeForm").find(':input[name="method"]').val();
      angular.forEach($("#testReposeForm").find(':input[name*="header_names"]'), function(el) {
        $scope.request.headers.push({
          name: el.value,
          value: ''
        })
      });
      angular.forEach($("#testReposeForm").find(':input[name*="header_values"]'), function(el, index) {
        $scope.request.headers[index].value = el.value;
      });
      $scope.request.body = $("#testReposeForm").find(':input[name="body"]').val();

      ReposeService.makeRequest($scope.id, $scope.request)
      .then(function(result){
        $scope.responses.push(result)
        $scope.requestLoading = false;
        $scope.requestLoaded = true;
        $scope.requestErrored = false;
        $log.info(result);
      })
      .catch(function(err){
        $scope.errorMessage = err;
        $log.error(err);
      });

      $log.info($scope.request);
    }

    $scope.showIntraFilter = function(response){

      $modal.open({
        templateUrl: '/views/intra_filter_modal.html',
        backdrop: 'static',
        controller: 'IntraFilterModalInstanceCtrl',
        resolve: {
          filters: function () {
            return response['intra-filter'];
          }
        }
      });
    }

    $scope.showHttp = function(response){

      $modal.open({
        templateUrl: '/views/http_debug_modal.html',
        backdrop: 'static',
        controller: 'LogModalInstanceCtrl',
        resolve: {
          data: function () {
            return response['http-debug'];
          },
          header: function () {
           return 'Http log';
         }
        }
      });
    }

    $scope.showErrors = function(response){

      $modal.open({
        templateUrl: '/views/log_modal.html',
        backdrop: 'static',
        controller: 'LogModalInstanceCtrl',
        resolve: {
          data: function () {
            return response['error'];
          },
          header: function () {
            return 'Error log';
          }
        }
      });
    }


  })
  .controller('IntraFilterModalInstanceCtrl', function ($scope, $modalInstance, filters, $log) {
    $log.info('inside intra filter instance ctrl', filters);
    $scope.filters = filters;

    $scope.dismiss = function () {
      $modalInstance.dismiss('cancel');
    };
  })
  .controller('LogModalInstanceCtrl', function ($scope, $modalInstance, data, header, $log) {
    $log.info('inside log instance ctrl', data);
    $scope.data = data;
    $scope.header = header;

    $scope.dismiss = function () {
      $modalInstance.dismiss('cancel');
    };
  });
