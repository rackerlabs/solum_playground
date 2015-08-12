'use strict';

describe('Directive: mainAppDetail', function () {

  // load the directive's module and view
  beforeEach(module('solumApp'));
  beforeEach(module('app/mainAppDetail/mainAppDetail.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<main-app-detail></main-app-detail>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the mainAppDetail directive');
  }));
});