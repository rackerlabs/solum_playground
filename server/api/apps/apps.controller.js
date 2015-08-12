'use strict';

var _ = require('lodash');
var request = require('request');
var async = require('async');
var yaml = require("js-yaml");
var Apps = require('./apps.model');

// Get list of apps
exports.index = function (req, res) {
  var plan_options = {
    url: 'https://dfw.solum.api.rackspacecloud.com/v1/plans',
    method: 'GET',
    headers: {
      'X-Auth-Token': req.user.raxToken
    }
  };
  var assembly_options = {
    url: 'https://dfw.solum.api.rackspacecloud.com/v1/assemblies',
    method: 'GET',
    headers: {
      'X-Auth-Token': req.user.raxToken
    }
  };

  async.parallel({
    plans: function (callback) {
      request(plan_options, function (error, response, body) {
        if (response !== undefined && error === null) {
          switch (response.statusCode) {
            case 200:
              var data = yaml.load(body);
              callback(null, data);
              break;
          }
        }
      });
    },
    assemblies: function (callback) {
      request(assembly_options, function (error, response, body) {
        if (response !== undefined && error === null) {
          switch (response.statusCode) {
            case 200:
              callback(null, JSON.parse(body));
              break;
            case 401:
              callback({ 'code': 401, 'message': 'Invalid credentials' });
              break;
            case 500:
              callback({ 'code': 500, 'message': 'App list retrieval failed' });
              break;
            default:
              callback({ 'code': 500, 'message': 'App list retrieval failed' });
              break;
          }
        } else {
          callback({ 'code': 500, 'message': 'App list retrieval failed' });
        }
      });
    }
  },
    function (err, results) {
      // results is now equal to: {one: 1, two: 2}
      var apps = [];
      if (err === null) {
        //get all plans first
        var plans = results.plans;
        var assemblies = results.assemblies;
        for (var p = 0, max = plans.length; p < max; p++) {
          //get the associated assembly
          var assembly_list = assemblies.filter(function (assembly) { return assembly.plan_uri === plans[p].uri });
          if (assembly_list.length > 0) {
            //assembly list exists.  let's get the latest one since that's the plan status
            var assembly = assembly_list.sort(function (a1, a2) {
              return new Date(a1.created_at) < new Date(a2.created_at);
            });
            apps.push({
              id: plans[p].uuid,
              name: plans[p].name,
              status: assembly[0].status,
              description: plans[p].description,
              application_uri: assembly[0].application_uri,
              language_pack: plans[p].artifacts[0].language_pack,
              assembly_uuid: assembly[0].uuid
            });
            if ([
              'ERROR',
              'ERROR_CODE_DEPLOYMENT',
              'UNIT_TESTING_FAILED',
              'READY'].indexOf(assembly[0].status) === -1) {
              statusQuery.start({
                name: plans[p].name,
                description: plans[p].description,
                uuid: assembly[0].uuid,
                uri: plans[p].uri,
                status: assembly[0].status,
                raxTenant: req.user.raxTenant,
                raxToken: req.user.raxToken,
                plan_id: plans[p].uuid
              });
            }
          } else {
            //registered, yo!
            apps.push({
              id: plans[p].uuid,
              name: plans[p].name,
              status: 'REGISTERED',
              description: plans[p].description,
              language_pack: plans[p].artifacts[0].language_pack,
              assembly_uuid: 'not yet deployed'
            });
          }
        }
        return res.json(200, apps);
      } else {
        return handleError(res, err);
      }
    });
};

// Get a single app
exports.show = function (req, res) {
  console.log(req.params.id);
  showApp(req, res);
};

// Get a single app status
exports.status = function (req, res) {
  console.log(req.params.id);
  appStatus(req.params.id, req.user.raxToken, res);
};

//Deploy an app
exports.deploy = function (req, res) {

};

// Creates a new apps in the DB.
exports.create = function (req, res) {
  var app = req.body.app;
  if (req.query.action === 'create') {
    //post that data!
    var plan = {
      version: 1,
      name: app.name,
      description: app.description,
      artifacts: []
    };

    var artifact = {
      name: app.name,
      content: {
        href: app.gitUrl
      },
      language_pack: app.language_pack.name,
      ports: 80
    };

    if (app.test_command) {
      artifact.unittest_cmd = app.test_command;
    }

    if (app.run_command) {
      artifact.run_cmd = app.run_command;
    }
    plan.artifacts.push(artifact);

    var plan_yaml = yaml.safeDump(plan)

    var plan_options = {
      url: 'https://dfw.solum.api.rackspacecloud.com/v1/plans',
      method: 'POST',
      headers: {
        'X-Auth-Token': req.user.raxToken,
        'content-type': 'application/x-yaml',
        'Content-Length': Buffer.byteLength(plan_yaml, 'utf8')
      },
      body: plan_yaml
    };
    request(plan_options, function (error, response, body) {
      if (response !== undefined && error === null) {
        switch (response.statusCode) {
          case 201:
            var result = yaml.load(body);
            return res.json(201, { 'result': 'success', 'app': result });
          case 401:
            return handleError(res, { 'code': 401, 'message': 'Invalid credentials' });
          case 500:
            return handleError(res, { 'code': 500, 'message': 'App list retrieval failed' });
          default:
            return handleError(res, { 'code': 500, 'message': 'App list retrieval failed' });
        }
      } else {
        return handleError(res, { 'code': 500, 'message': 'App list retrieval failed' });
      }
    });
  } else if (req.query.action === 'deploy') {
    //post that data!
    var assembly = {
      name: app.name,
      description: app.description,
      plan_uri: app.plan_uri
    };

    var assembly_json = JSON.stringify(assembly);

    var assembly_options = {
      url: 'https://dfw.solum.api.rackspacecloud.com/v1/assemblies',
      method: 'POST',
      headers: {
        'X-Auth-Token': req.user.raxToken,
        'content-type': 'application/json',
        'Content-Length': Buffer.byteLength(assembly_json, 'utf8')
      },
      body: assembly_json
    };
    request(assembly_options, function (error, response, body) {
      if (response !== undefined && error === null) {
        switch (response.statusCode) {
          case 201:
            var result = JSON.parse(body);
            var plan_id = result.plan_uri.split('/')[result.plan_uri.split('/').length - 1];
            statusQuery.start({
              name: result.name,
              description: result.description,
              uuid: result.uuid,
              uri: result.uri,
              status: result.status,
              raxTenant: req.user.raxTenant,
              raxToken: req.user.raxToken,
              plan_id: plan_id
            });
            return res.json(201, { 'result': 'success', 'app': result });
          case 401:
            return handleError(res, { 'code': 401, 'message': 'Invalid credentials' });
          case 500:
            return handleError(res, { 'code': 500, 'message': 'App list retrieval failed' });
          default:
            return handleError(res, { 'code': 500, 'message': 'App list retrieval failed' });
        }
      } else {
        return handleError(res, { 'code': 500, 'message': 'App list retrieval failed' });
      }
    });
  }
};

// Updates an existing apps in the DB.
exports.update = function (req, res) {
  if (req.body._id) { delete req.body._id; }
  Apps.findById(req.params.id, function (err, apps) {
    if (err) { return handleError(res, err); }
    if (!apps) { return res.send(404); }
    var updated = _.merge(apps, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, apps);
    });
  });
};

// Deletes a apps from the DB.
exports.destroy = function (req, res) {
  var plan_options = {
    url: 'https://dfw.solum.api.rackspacecloud.com/v1/plans/' + req.params.id,
    method: 'DELETE',
    headers: {
      'X-Auth-Token': req.user.raxToken
    }
  };
  console.log(plan_options);
  request(plan_options, function (error, response, body) {
    console.log(error, response.statusCode, body);
    if (response !== undefined && error === null) {
      switch (response.statusCode) {
        case 202:
          return res.json(202, { 'result': 'success' });
        case 401:
          return handleError(res, { 'code': 401, 'message': 'Invalid credentials' });
        case 500:
          return handleError(res, { 'code': 500, 'message': 'App list retrieval failed' });
        default:
          return handleError(res, { 'code': 500, 'message': 'App list retrieval failed' });
      }
    } else {
      return handleError(res, { 'code': 500, 'message': 'App list retrieval failed' });
    }
  });
};

function handleError(res, err) {
  return res.send(500, err);
}

function handleUnauthErr(res, err) {
  return res.send(401, err);
}

function showApp(req, res) {
  var plan_options = {
    url: 'https://dfw.solum.api.rackspacecloud.com/v1/plans/' + req.params.id,
    method: 'GET',
    headers: {
      'X-Auth-Token': req.user.raxToken
    }
  };
  var assembly_options = {
    url: 'https://dfw.solum.api.rackspacecloud.com/v1/assemblies',
    method: 'GET',
    headers: {
      'X-Auth-Token': req.user.raxToken
    }
  };
  //get log url from catalog.  Region defaults to dfw right now
  var cloudFilesCatalog = req.user.catalog.filter(function (catalog) {
    return (catalog.name === "cloudFiles" && catalog.endpoints.filter(function (endpoint) {
      return endpoint.region === "DFW";
    }).length > 0);
  });

  var cloudFilesUrl = cloudFilesCatalog[0].endpoints.filter(function (endpoint) {
    return endpoint.region === "DFW"
  })[0].publicURL;

  var log_options = {
    url: cloudFilesUrl,
    method: 'GET',
    headers: {
      'X-Auth-Token': req.user.raxToken
    }
  };
  
  //get heat url from catalog.  Region defaults to dfw right now
  var heatOrchestrationCatalog = req.user.catalog.filter(function (catalog) {
    return (catalog.name === "cloudOrchestration" && catalog.endpoints.filter(function (endpoint) {
      return endpoint.region === "DFW";
    }).length > 0);
  });

  var heatUrl = heatOrchestrationCatalog[0].endpoints.filter(function (endpoint) {
    return endpoint.region === "DFW"
  })[0].publicURL;


  async.parallel({
    plan: function (callback) {
      request(plan_options, function (error, response, body) {
        if (response !== undefined && error === null) {
          switch (response.statusCode) {
            case 200:
              var data = yaml.load(body);
              callback(null, data);
              break;
          }
        }
      });
    },
    assemblies: function (callback) {
      request(assembly_options, function (error, response, body) {
        if (response !== undefined && error === null) {
          switch (response.statusCode) {
            case 200:
              callback(null, JSON.parse(body));
              break;
            case 401:
              callback({ 'code': 401, 'message': 'Invalid credentials' });
              break;
            case 500:
              callback({ 'code': 500, 'message': 'App list retrieval failed' });
              break;
            default:
              callback({ 'code': 500, 'message': 'App list retrieval failed' });
              break;
          }
        } else {
          callback({ 'code': 500, 'message': 'App list retrieval failed' });
        }
      });
    }
  },
    function (err, results) {
      // results is now equal to: {one: 1, two: 2}
      var app = {};
      /*
      {
        id: uuid,
        name: plan_name,
        status: <if plan does not have assembly, REGISTERED> else <assembly_status of last assembly>,
        link: application_uri
        description: plan_description,
        language_pack: 
      }
      
      */
      if (err === null) {
        //get all plans first
        var plan = results.plan;
        var assemblies = results.assemblies;
        //var logs = results.logs;
        //var heat = results.orchestration;
        //get the associated assembly
        var assembly_list = assemblies.filter(function (assembly) { return assembly.plan_uri === plan.uri });
        var last_status = (assembly_list.length > 1) ? assembly_list[1] : { status: 'NONE' };
        if (assembly_list.length > 0) {
          //there's a last build!  let's get that status too!
          app = {
            id: plan.uuid,
            name: plan.name,
            status: assembly_list[0].status,
            description: plan.description,
            application_uri: assembly_list[0].application_uri,
            language_pack: plan.artifacts[0].language_pack,
            assembly_uuid: assembly_list[0].uuid,
            last_build_status: last_status,
            created_at: assembly_list[0].created_at,
            updated_at: assembly_list[0].updated_at,
            git_url: plan.artifacts[0].content.href,
            run_command: plan.artifacts[0].run_cmd,
            test_command: plan.artifacts[0].unittest_cmd,
            workflow: assembly_list[0].workflow,
            build_trigger: plan.trigger_uri + '?workflow=build',
            deploy_trigger: plan.trigger_uri + '?workflow=deploy',
            plan_uri: plan.uri
          };

          if ([
            'ERROR',
            'ERROR_CODE_DEPLOYMENT',
            'UNIT_TESTING_FAILED',
            'READY'].indexOf(app.status) === -1) {
            statusQuery.start({
              name: app.name,
              description: app.description,
              uuid: assembly_list[0].uuid,
              uri: app.plan_uri,
              status: app.status,
              raxTenant: req.user.raxTenant,
              raxToken: req.user.raxToken,
              plan_id: app.id
            });
          }

        } else {
          //this is the o.g.
          app = {
            id: plan.uuid,
            name: plan.name,
            status: 'REGISTERED',
            description: plan.description,
            language_pack: plan.artifacts[0].language_pack,
            last_build_status: last_status,
            created_at: plan.created_at,
            updated_at: plan.created_at,
            git_url: plan.artifacts[0].content.href,
            run_command: plan.artifacts[0].run_cmd,
            test_command: plan.artifacts[0].unittest_cmd,
            build_trigger: plan.trigger_uri + '?workflow=build',
            deploy_trigger: plan.trigger_uri + '?workflow=deploy',
            plan_uri: plan.uri
          }
        }
        return res.json(200, app);
      } else {
        return handleError(res, err);
      }
    });
}

function appStatus(app, cb) {
  var assembly_options = {
    url: 'https://dfw.solum.api.rackspacecloud.com/v1/assemblies/' + app.uuid,
    method: 'GET',
    headers: {
      'X-Auth-Token': app.raxToken
    }
  };

  request(assembly_options, function (error, response, body) {
    if (response !== undefined && error === null) {
      switch (response.statusCode) {
        case 200:
          //save App
          return cb(200, JSON.parse(body));
        case 401:
          return cb(401, 'Invalid credentials');
        case 500:
          return cb(500, 'App list retrieval failed');
        default:
          return cb(500, 'App list retrieval failed');
      }
    } else {
      return cb(500, 'App list retrieval failed');
    }
  });
}

var statusQuery = {
  start: function (saved_app) {
    //initial call to start querying the status
    //we just deployed.  Create a new app
    var self = this;
    Apps.create(saved_app, function (err, app) {
      //we succeed in creating the app.  Start querying
      self.timeoutID = setInterval(function (timeout_app) {
        //call app status and get back id of the call
        appStatus(saved_app, function (status, data) {
          console.log('status stuff: ', data.status)
          if ([
            'ERROR',
            'ERROR_CODE_DEPLOYMENT',
            'UNIT_TESTING_FAILED',
            'READY'].indexOf(data.status) > -1) {
            self.cancel();
          }
          Apps.findById(timeout_app._id, function (err, application) {
            if (err) { console.log('errorz', err); }
            if (!application) { console.log('no app, yo!'); }
            Apps.updateStatus(
              timeout_app._id, data.status,
              data.updated_at, data.application_uri,
              function (err) {
                if (err) { console.log('errorz', err); }
              });
          });
        });
      }, 1000, app);
    });

  },
  cancel: function () {
    clearInterval(this.timeoutID);
    delete this.timeoutID;
  }
}