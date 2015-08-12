'use strict';

angular.module('solumApp')
  .controller('AppsCtrl', function ($scope, App, $location, socket) {
  if ($scope.apps === undefined) {
    App.getApps(function (data) {
      console.log('apps result', data);
      if (data && data.length > 0) {
        $scope.apps = data;
        for (var i = 0, max = data.length; i < max; i++) {
          (function (app) {
            console.log('app: ', app);
            socket.syncUpdates('app_status:' + app.id, [app], function (event, item, arr) {
              app.status = item.status;
              app.application_uri = item.application_uri;
              console.log('event ', event, item, arr);
            });

          })($scope.apps[i]);
        }

      } else {
        $scope.message = "get started";
        $location.path('/get_started');
      }
    });
  } else if ($scope.apps.length == 0) {
    console.log('apps 2');
    console.log('apps', $scope.apps, $scope.apps.length);
    $location.path('/get_started');
  }
  $scope.message = 'Hello';
});
