'use strict';

describe('Controller: InternalCtrl', function () {

  // load the controller's module
  beforeEach(module('reposePlaygroundApp'));

  var InternalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InternalCtrl = $controller('InternalCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(InternalCtrl.awesomeThings.length).toBe(3);
  });
});
