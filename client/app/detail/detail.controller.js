'use strict';

angular.module('solumApp')
  .controller('DetailCtrl', function ($scope, $stateParams, App, socket) {
  App.getAppDetail($stateParams.id, function (data) {
    $scope.app = data;
    $scope.app.language_pack = $scope.language_packs.filter(function (lp) {
      return lp.id == $scope.app.language_pack
    })[0];
    var last_app = $.extend(true, {}, $scope.app)
    console.log($scope.app.id);
    socket.syncUpdates('app_status:' + $scope.app.id, [$scope.app], function (event, item, arr) {
      $scope.app.last_build_status = {
        uuid: last_app.id,
        id: last_app.id,
        status: last_app.status
      };
      $scope.app.status = item.status;
      $scope.app.updated_at = item.updated_at;
      $scope.app.application_uri = item.application_uri;
      console.log('event ', event, item, arr);
    });
  });
});


angular.module('solumApp')
  .controller('DeployCtrl', function ($scope, $modalInstance, app, socket) {
  $scope.app = app;

  socket.syncUpdates('app_status:' + $scope.app.id, [$scope.app], function (event, item, arr) {
    $scope.app.status = item.status;
    $scope.app.updated_at = item.updated_at;
    $scope.app.application_uri = item.application_uri;
  });


  $scope.ok = function () {
    //$modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});