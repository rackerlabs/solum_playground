'use strict';

describe('Controller: InternalCtrl', function () {

  // load the controller's module
  beforeEach(module('solumApp'));

  var InternalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InternalCtrl = $controller('InternalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
