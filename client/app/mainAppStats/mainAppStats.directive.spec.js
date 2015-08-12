'use strict';

describe('Directive: mainAppStats', function () {

  // load the directive's module and view
  beforeEach(module('solumApp'));
  beforeEach(module('app/mainAppStats/mainAppStats.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<main-app-stats></main-app-stats>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the mainAppStats directive');
  }));
});