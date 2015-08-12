'use strict';

describe('Controller: AppsCtrl', function () {

  // load the controller's module
  beforeEach(module('solumApp'));

  var AppsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AppsCtrl = $controller('AppsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
