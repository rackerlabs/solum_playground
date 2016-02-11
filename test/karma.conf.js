// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-08-16 using
// generator-karma 1.0.0

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      "jasmine"
    ],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'client/bower_components/jquery/jquery.js',
      'client/bower_components/angular/angular.js',
      'client/bower_components/bootstrap/dist/js/bootstrap.js',
      'client/bower_components/angular-animate/angular-animate.js',
      'client/bower_components/angular-aria/angular-aria.js',
      'client/bower_components/angular-cookies/angular-cookies.js',
      'client/bower_components/angular-messages/angular-messages.js',
      'client/bower_components/angular-resource/angular-resource.js',
      'client/bower_components/angular-route/angular-route.js',
      'client/bower_components/angular-sanitize/angular-sanitize.js',
      'client/bower_components/angular-touch/angular-touch.js',
      'client/bower_components/angular-ui-router/release/angular-ui-router.js',
      'client/bower_components/jasmine-jquery/lib/jasmine-jquery.js',
      'client/bower_components/canon/dist/canon.js',
      'client/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'client/bower_components/json3/lib/json3.js',
      'client/bower_components/angular-socket-io/socket.js',
      'client/bower_components/checklist-model/checklist-model.js',
      'client/bower_components/seiyria-bootstrap-slider/js/bootstrap-slider.js',
      'client/bower_components/angular-bootstrap-slider/slider.js',
      'client/bower_components/angular-pretty-xml/src/angular-pretty-xml.js',
      'client/bower_components/vkBeautify-wrapper/dist/vkbeautify.0.99.00.beta.js',
      'client/bower_components/jszip/dist/jszip.js',
      'client/bower_components/blob-polyfill/Blob.js',
      'client/bower_components/file-saver.js/FileSaver.js',
      'client/bower_components/angular-file-saver/dist/angular-file-saver.bundle.js',
      'client/bower_components/ng-file-upload/ng-file-upload.js',
      'client/bower_components/angular-mocks/angular-mocks.js',
      // endbower
      "app/scripts/**/*.js",
      "test/mock/**/*.js",
      "test/spec/**/*.js"
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      "PhantomJS"
    ],

    // Which plugins to enable
    plugins: [
      "karma-phantomjs-launcher",
      "karma-jasmine"
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
