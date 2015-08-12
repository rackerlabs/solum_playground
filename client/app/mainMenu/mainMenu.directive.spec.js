'use strict';

describe('Directive: mainMenu', function () {

  // load the directive's module and view
  beforeEach(module('solumApp'));
  beforeEach(module('app/mainMenu/mainMenu.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<main-menu></main-menu>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the mainMenu directive');
  }));
});