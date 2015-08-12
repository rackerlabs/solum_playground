'use strict';

angular.module('solumApp')
  .directive('mainAppHeader', function ($modal, $log, App, $location) {
  return {
    templateUrl: 'app/mainAppHeader/mainAppHeader.html',
    restrict: 'EA',
    link: function (scope, element, attrs) {
      scope.deleteApp = function (app) {
        //deploy an application here
        console.log(app)
        App.deleteApp(app)
          .then(function (result) {
          $log.info('Deleting an application', result);
          $location.path('/apps');
        })
          .catch(function (err) {
          $log.info('error: ', err)
        });

      };
      scope.deploy = function (app) {
        //deploy an application here
        App.deploy({
          app: app
        })
          .then(function (result) {
          $log.info('Deploying an application', result);
          app.status = result.app.status;
          app.created_at = result.app.created_at;
          app.updated_at = result.app.updated_at;
          app.id = result.app.uuid;

          var modalInstance = $modal.open({
            animation: scope.animationsEnabled,
            templateUrl: 'deployContent.html',
            controller: 'DeployCtrl',
            size: 1500,
            resolve: {
              app: function () {
                return app;
              }
            }
          });

          modalInstance.result.then(function (selectedItem) {
            scope.selected = selectedItem;
          }, function () {
              $log.info('Modal dismissed at: ' + new Date());
            });
        })
          .catch(function (err) {
          $log.info('error: ', err)
        });

      };
    }
  };
});
