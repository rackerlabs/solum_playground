'use strict';

describe('Controller: LoginCtrl', function () {

  // load the controller's module
  beforeEach(module('solumApp'));

  var LoginCtrl, scope, Auth, location, deferred, q, fakeAuth, fakeForm;

  describe('When navigating to landing page', function () {
    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, _$location_, _Auth_) {
      scope = $rootScope.$new();
      location = _$location_;
      Auth = _Auth_;
      LoginCtrl = $controller('LoginCtrl', {
        $scope: scope,
        Auth: Auth,
        $location: location
      });
    }));

    it('should show landing page without any actions', function () {
      expect(location.$$path).toBe('/');
    });

    it('should not populate user model without any actions', function () {
      expect(scope.user).toEqual({});
    });

    it('should not populate errors without any actions', function () {
      expect(scope.errors).toEqual({});
    });

    it('should not be submitted without any actions', function () {
      expect(scope.submitted).toBeUndefined();
    });
  });

  describe('When logging in with invalid data', function () {
    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, _$location_, _$q_) {
      scope = $rootScope.$new();
      location = _$location_;
      q = _$q_;
      fakeForm = {};
      fakeAuth = {};
      fakeForm.$valid = false;
      fakeForm.$dirty = true;
      
      //spyOn(fakeAuth, 'login').andCallThrough();
      LoginCtrl = $controller('LoginCtrl', {
        $scope: scope,
        Auth: fakeAuth,
        $location: location
      });
      scope.login(fakeForm);
    }));

    it('should show landing page', function () {
      expect(location.$$path).toBe('/');
    });

    it('should not populate user model', function () {
      expect(scope.user).toEqual({});
    });

    it('should not populate errors', function () {
      expect(scope.errors).toEqual({});
    });

    it('should set submitted to true', function () {
      expect(scope.submitted).toBe(true);
    });

  });

  describe('When logging in with valid data', function () {
    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, _$location_, _$q_) {
      scope = $rootScope.$new();
      location = _$location_;
      q = _$q_;
      fakeForm = {};
      fakeAuth = {
        login: function () {
          deferred = q.defer();
          // Place the fake return object here
          deferred.resolve({ });
          return deferred.promise;
        }
      };
      fakeForm.$valid = true;
      fakeForm.$dirty = true;
      //spyOn(fakeAuth, 'login').and.callFake();
      
      //spyOn(fakeAuth, 'login').andCallThrough();
      LoginCtrl = $controller('LoginCtrl', {
        $scope: scope,
        Auth: fakeAuth,
        $location: location
      });
      scope.$apply(function(){
        scope.user.username = 'test';
        scope.user.password = 'test';});
      scope.login(fakeForm);
      scope.$apply();
    }));

    it('should redirect to internal page', function () {
      //expect(fakeAuth.login).toHaveBeenCalled();
      expect(location.$$path).toBe('/internal');
    });

    it('should set submitted to true', function () {
      expect(scope.submitted).toBe(true);
    });

    it('should populate user model', function () {
      expect(scope.user).toEqual({username: 'test', password: 'test'});
    });

    it('should not populate errors', function () {
      expect(scope.errors).toEqual({});
    });

  });

  describe('When getting invalid response from server', function () {
    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope, _$location_, _$q_) {
      scope = $rootScope.$new();
      location = _$location_;
      q = _$q_;
      fakeForm = {};
      fakeAuth = {
        login: function () {
          deferred = q.defer();
          // Place the fake return object here
          deferred.reject({ message: 'Boo' });
          return deferred.promise;
        }
      };
      fakeForm.$valid = true;
      fakeForm.$dirty = true;
      //spyOn(fakeAuth, 'login').and.callFake();
      
      //spyOn(fakeAuth, 'login').andCallThrough();
      LoginCtrl = $controller('LoginCtrl', {
        $scope: scope,
        Auth: fakeAuth,
        $location: location
      });
      scope.$apply(function(){
        scope.user.username = 'test';
        scope.user.password = 'test';});
      scope.login(fakeForm);
      scope.$apply();
    }));

    it('should stay on landing page', function () {
      expect(location.$$path).toBe('/');
    });

    it('should set submitted to true', function () {
      expect(scope.submitted).toBe(true);
    });

    it('should populate user model', function () {
      expect(scope.user).toEqual({username: 'test', password: 'test'});
    });

    it('should populate errors', function () {
      expect(scope.errors.other).toEqual('Boo');
    });

  });



});
