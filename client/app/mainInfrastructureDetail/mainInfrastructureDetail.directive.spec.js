'use strict';

describe('Directive: mainInfrastructureDetail', function () {

  // load the directive's module and view
  beforeEach(module('solumApp'));
  beforeEach(module('app/mainInfrastructureDetail/mainInfrastructureDetail.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<main-infrastructure-detail></main-infrastructure-detail>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the mainInfrastructureDetail directive');
  }));
});