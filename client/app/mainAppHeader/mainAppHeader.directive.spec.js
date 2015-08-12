'use strict';

describe('Directive: mainAppHeader', function () {

  // load the directive's module and view
  beforeEach(module('solumApp'));
  beforeEach(module('app/mainAppHeader/mainAppHeader.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<main-app-header></main-app-header>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the mainAppHeader directive');
  }));
});