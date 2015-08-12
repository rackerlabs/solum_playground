'use strict';

describe('Service: App', function () {

  // load the service's module
  beforeEach(module('solumApp'));

  // instantiate service
  var App, Auth, $httpBackend;

  describe('When getting applications with result of 1 app', function () {
    beforeEach(inject(function (_App_, _Auth_, _$httpBackend_) {
      App = _App_;
      Auth = _Auth_;
      $httpBackend = _$httpBackend_;
      $httpBackend
        .when('GET', '/api/apps')
        .respond(200,
        [
          {
            'name': 'test1',
            'language_pack': 'python27',
            'description': 'test desc',
            'assembly_uuid': '123',
            'status': 'READY',
            'application_uri': 'awesomesite.com'
          }
        ]);
    }));

    it('should return applications', function () {
      App.getApps(function (data) {
        expect(data.length).toBe(1);
      });
      $httpBackend.flush();
    });

    it('should return app name', function () {
      App.getApps(function (data) {
        expect(data[0].name).toBe('test1');
      });
      $httpBackend.flush();
    });

    it('should return app language pack', function () {
      App.getApps(function (data) {
        expect(data[0].language_pack).toBe('python27');
      });
      $httpBackend.flush();
    })
  });

  describe('When getting applications with error result', function () {
    beforeEach(inject(function (_App_, _Auth_, _$httpBackend_) {
      App = _App_;
      Auth = _Auth_;
      $httpBackend = _$httpBackend_;
      $httpBackend
        .when('GET', '/api/apps')
        .respond(401,
        {
          'error': 'Invalid Credentials'
        });
    }));

    it('should return error code', function () {
      App.getApps(function (err) {
        expect(err.error).toBe('Invalid Credentials');
      });
      $httpBackend.flush();
    });
  });

  describe('When getting app detail with valid result', function () {
    beforeEach(inject(function (_App_, _Auth_, _$httpBackend_) {
      App = _App_;
      Auth = _Auth_;
      $httpBackend = _$httpBackend_;
      $httpBackend
        .when('GET', '/api/apps/1')
        .respond(200,
        {
          'id': '1',
          'name': 'test1',
          'language_pack': {
            'id': 'python27',
            'name': 'Python 2.7'
          },
          'created_at': new Date(),
          'updated_at': new Date(),
          'description': 'test desc',
          'assembly_uuid': '123',
          'status': 'READY',
          'application_uri': 'awesomesite.com',
          'git_url': 'https://github.com/example/run',
          'run_command': 'service test start',
          'test_command': 'mvn clean verify',
          'workflow': ['build', 'deploy'],
          'build_trigger': 'https://github.com/v1/triggers/123?workflow=build',
          'deploy_trigger': 'https://github.com/v1/triggers/123?workflow=deploy',
          'infrastructure': [
            { 'name': 'server1', 'type': 'server' }
          ]
        }
        );
    }));

    it('should return app detail id', function () {
      App.getAppDetail(1, function (data) {
        expect(data.id).toBe('1');
      });
      $httpBackend.flush();
    });

    it('should return app name', function () {
      App.getAppDetail(1, function (data) {
        expect(data.name).toBe('test1');
      });
      $httpBackend.flush();
    });

    it('should return app language pack name', function () {
      App.getAppDetail(1, function (data) {
        expect(data.language_pack.name).toBe('Python 2.7');
      });
      $httpBackend.flush();
    })

    it('should return app workflow', function () {
      App.getAppDetail(1, function (data) {
        expect(data.workflow).toContain('build');
      });
      $httpBackend.flush();
    })
  });

  describe('When getting app detail with error result', function () {
    beforeEach(inject(function (_App_, _Auth_, _$httpBackend_) {
      App = _App_;
      Auth = _Auth_;
      $httpBackend = _$httpBackend_;
      $httpBackend
        .when('GET', '/api/apps/1')
        .respond(401,
        {
          'error': 'Invalid Credentials'
        });
    }));

    it('should return error code', function () {
      App.getAppDetail(1, function (err) {
        expect(err.error).toBe('Invalid Credentials');
      });
      $httpBackend.flush();
    });
  });

  describe('When creating app with valid result', function () {

    var deferred, resolveValue;

    beforeEach(inject(function (_App_, _Auth_, _$httpBackend_) {
      App = _App_;
      Auth = _Auth_;
      $httpBackend = _$httpBackend_;

      $httpBackend
        .expectPOST('/api/apps', {'ID':1})
        .respond(201,
        {
          'id': '1'
        }
        );
    }));

    it('should return app detail id', function () {
      App.create({'ID':1}, function (data) {
        expect(data.id).toBe('1');
      });
      $httpBackend.flush();
    });
  });

  describe('When creating app with invalid result', function () {

    var deferred, resolveValue;

    beforeEach(inject(function (_App_, _Auth_, _$httpBackend_) {
      App = _App_;
      Auth = _Auth_;
      $httpBackend = _$httpBackend_;

      $httpBackend
        .expectPOST('/api/apps', {'ID':1})
        .respond(401,
        {
          'error': 'Invalid Credentials'
        });
    }));

    it('should return error code', function () {
      App.create({'ID':1}, function (err) {
        expect(err.error).toBe('Invalid Credentials');
      });
      $httpBackend.flush();
    });
  });

});
