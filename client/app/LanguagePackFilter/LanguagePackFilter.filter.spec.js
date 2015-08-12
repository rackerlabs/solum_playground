'use strict';

describe('Filter: LanguagePackFilter', function () {

  // load the filter's module
  beforeEach(module('solumApp'));

  // initialize a new instance of the filter before each test
  var LanguagePackFilter;
  beforeEach(inject(function ($filter) {
    LanguagePackFilter = $filter('LanguagePackFilter');
  }));

  it('should return the input prefixed with "LanguagePackFilter filter:"', function () {
    var text = 'angularjs';
    expect(LanguagePackFilter(text)).toBe('LanguagePackFilter filter: ' + text);
  });

});
