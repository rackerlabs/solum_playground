'use strict';

describe('Filter: NameFilter', function () {

  // load the filter's module
  beforeEach(module('solumApp'));

  // initialize a new instance of the filter before each test
  var NameFilter;
  beforeEach(inject(function ($filter) {
    NameFilter = $filter('NameFilter');
  }));

  it('should return the input prefixed with "NameFilter filter:"', function () {
    var text = 'angularjs';
    expect(NameFilter(text)).toBe('NameFilter filter: ' + text);
  });

});
