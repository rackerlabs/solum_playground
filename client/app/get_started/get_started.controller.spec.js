'use strict';

describe('Controller: GetStartedCtrl', function () {

  // load the controller's module
  beforeEach(module('solumApp'));

  var GetStartedCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GetStartedCtrl = $controller('GetStartedCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
