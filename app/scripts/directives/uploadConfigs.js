'use strict';

angular.module('reposePlaygroundApp')
  .directive('uploadConfigs', function (ReposeService, $log, $compile, Upload, $modal, $location) {
    return {
      templateUrl: 'views/uploadConfigs.html',
      restrict: 'E',
      link: function (scope, element, attrs) {
        $log.log('in upload configs directive', scope, element, attrs);

        scope.uploadFiles = function() {
          $log.info('client on upload files');
          if (scope.file) {
            scope.upload(scope.file);
          }
        }

        // upload on file select or drop
        scope.upload = function (file) {
          $modal.open({
            templateUrl: '/views/create_file_modal.html',
            backdrop: 'static',
            controller: 'UploadModalInstanceCtrl',
            resolve: {
              file: function () {
                return file;
              },
              newInstance: function () {
                return scope.newInstance;
              },
              isUploading: function() {
                return true;
              }
            }
          });
          $log.info('upload file', file)

        }


        function cleanErrors(){
          scope.ui.errorMessage = "";
        }
      }
    };
  });
