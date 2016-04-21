from functools import wraps
from flask import abort
from flask import jsonify
from flask import Flask
from flask import request
app = Flask(__name__)
import json

import getpass
import json
import os
import requests
import socket

username = None # raw_input('Username: ')
password = None #getpass.getpass('Password: ')

url = 'https://identity.api.rackspacecloud.com/v2.0/tokens'

data = {'auth': {'RAX-AUTH:domain': {'name': 'Rackspace'},
                 'passwordCredentials': {'username': username,
                                         'password': password}}}

headers = {'Content-Type': 'application/json',
           'Accept': 'application/json'}

SOLUM_URL = "https://dfw.solum.api.rackspacecloud.com"
#SOLUM_URL = "https://vijendar-dfw-dev-api.dev.rs-paas.com"
SOLUM_URL = "https://nick-dfw-dev-api.dev.rs-paas.com"
SOLUM_URL = "https://dfw-staging-api.labs.rs-paas.com"

if os.environ.get('SOLUM_URL', None) is not None:
    SOLUM_URL = os.environ.get('SOLUM_URL')

def get_headers():
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'}    

    try:
        headers['X-Auth-Token'] = request.headers['token']
    except Exception as exp:
        return None
    
    return headers

def auth_required_msg():
    message = ("The server could not verify that you are authorized to access "
               "the URL requested. You either supplied the wrong credentials "
               "(e.g. a bad password), or your browser doesn't understand how "
               "to supply the credentials required.")
    return message, 401
    #abort(401)
    
def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        try:
            headers['X-Auth-Token'] = request.headers['token']
            #message = {'message': " Need auth token... please authenticate/login."}
            #resp = jsonify(message)
            #resp.status_code == 401
            #return resp
        except Exception as exp:
            message = {'message': " Need auth token... please authenticate/login."}
            resp = jsonify(message)
            resp.status_code == 401
            return resp
        return f(*args, **kwargs)

    return decorated

@app.route("/app/language_packs", methods=["GET"])
def language_packs_list():
    headers = get_headers()
    if not headers:
        return auth_required_msg()
    resp = requests.get(SOLUM_URL+"/v1/language_packs", headers=headers)
    if resp.status_code == 401:
        return auth_required_msg()
        
    return json.dumps(resp.json())

@app.route("/app/language_packs", methods=["POST"])
def language_pack_create():
    headers = get_headers()
    if not headers:
        return auth_required_msg()
    try:
        data = json.loads(request.data)
    except ValueError:
        data = {}
    
    lp_data = {
        "source_uri": data.get("uri", ""),
        "base_url": "/v1",
        "name": data.get("name", "")
    }
    resp = requests.post(SOLUM_URL+"/v1/language_packs",
                         headers=headers,
                         data=json.dumps(lp_data))
    if resp.status_code == 401:
        return auth_required_msg()

    #if resp.status_code != 201:
        #raise Exception(resp.json())
    return json.dumps(resp.json())

@app.route("/app/repose/list", methods=["POST", "GET"])
def app_list():
    headers = get_headers()
    if not headers:
        return auth_required_msg()
    resp = requests.get(SOLUM_URL+"/v1/apps", headers=headers)
    if resp.status_code == 401:
        return auth_required_msg()

    return json.dumps(resp.json())

@app.route("/app/repose/delete/<app_id>", methods=["DELETE"])
def app_delete(app_id):
    headers = get_headers()
    if not headers:
        return auth_required_msg()
    resp = requests.delete(SOLUM_URL+"/v1/apps/%s" % app_id, headers=headers)
    if resp.status_code == 401:
        return auth_required_msg()

    #if resp.status_code != 204:
        #raise Exception("Failed to delete application")
    return json.dumps({"status": "success"})


@app.route("/app/language_packs/delete/<lp_id>", methods=["DELETE"])
def lp_delete(lp_id):
    headers = get_headers()
    if not headers:
        return auth_required_msg()
    resp = requests.delete(SOLUM_URL+"/v1/language_packs/%s" % lp_id, headers=headers)
    if resp.status_code == 401:
        return auth_required_msg()

    #if resp.status_code != 204:
        #raise Exception("Failed to delete the languagepack")
    return json.dumps({"status": "success"})

@app.route("/app/language_packs/logs/<lp_id>", methods=["GET"])
def lp_logs(lp_id):
    headers = get_headers()
    if not headers:
        return auth_required_msg()

    resp = requests.get(
        SOLUM_URL+"/v1/language_packs/%s/logs" % lp_id,
        headers=headers)

    if resp.status_code == 401:
        return auth_required_msg()
    
    return json.dumps(resp.json()[0])

@app.route("/app/repose/create/", methods=["POST"])
def app_create():
    headers = get_headers()
    if not headers:
        return auth_required_msg()
    try:
        data = json.loads(request.data)
    except ValueError:
        data = {}

    app_data = {
        "repo_token": "",
        "name": data.get("name", "TestApp"),
        "parameters": {
            "carina_params": {
                "cluster_name": data.get("clustername"),
                "api_key": data.get("apikey"),
                "user_name": data.get("username")
            },
            "user_params":  data.get('user_params', {})
        },
        "description": data.get("description", "unknown description"),
        "base_url": "/v1",
        "languagepack": data.get("lp_name", "lp unknown"),
        "source": {
            "repository": data.get("repo", "unkown"),
            "revision": "master"
        },
        "version": 1,
        "trigger_actions": ["unittest", "build", "deploy"],
        "ports": [int(data.get('ports', 80))],
        "workflow_config": {
            "test_cmd": data.get("test_cmd", ""),
            "run_cmd": data.get("run_cmd", "")
        }
    }
    
    resp = requests.post(SOLUM_URL+"/v1/apps",
                         headers=headers,
                         data=json.dumps(app_data))
    if resp.status_code == 401:
        return auth_required_msg()

    return json.dumps(resp.json())

@app.route("/app/repose/scale/", methods=["POST"])
def app_scale():
    headers = get_headers()
    if not headers:
        return auth_required_msg()
    try:
        data = json.loads(request.data)
    except ValueError:
        data = {}
    scale_data = {
        "scale_target": data.get("scale_target"),
        "base_url": "/v1/apps/%s/workflows" % data.get("app_id"),
        "actions": ["scale"]
    }
    resp = requests.post(SOLUM_URL+"/v1/apps/%s/workflows" % data.get("app_id"),
                         headers=headers,
                         data=json.dumps(scale_data))
    if resp.status_code == 401:
        return auth_required_msg()

    return json.dumps(resp.json())

@app.route("/app/repose/deploy/<app_id>/workflows", methods=["POST"])
def app_deploy(app_id):
    headers = get_headers()
    if not headers:
        return auth_required_msg()

    data = {"actions": ["unittest", "build", "deploy"]}
    resp = requests.post(SOLUM_URL+"/v1/apps/%s/workflows" % app_id,
                         headers=headers,
                         data=json.dumps(data))
    if resp.status_code == 401:
        return auth_required_msg()

    return json.dumps(resp.json())

@app.route("/app/repose/show/<app_id>", methods=["GET"])
def app_show(app_id):
    headers = get_headers()
    if not headers:
        return auth_required_msg()

    resp = requests.get(SOLUM_URL+"/v1/apps/%s" % app_id,
                         headers=headers)
    if resp.status_code == 401:
        return auth_required_msg()

    json_resp = resp.json()
    try:
        json_resp['cluster_name'] = json.loads(json_resp['raw_content'])['parameters']['carina_params']['cluster_name']
    except Exception:
        # TODO
        pass
    
    return json.dumps(json_resp)

@app.route("/app/repose/logs/<app_id>", methods=["GET"])
def app_logs(app_id):
    headers = get_headers()
    if not headers:
        return auth_required_msg()

    resp = requests.get(SOLUM_URL+"/v1/apps/%s/workflows" % app_id,
                         headers=headers)
    if resp.status_code == 401:
        return auth_required_msg()

    json_resp = resp.json()
    logs = []
    for wf in json_resp:
        resp = requests.get(
            SOLUM_URL+"/v1/apps/%s/workflows/%s/logs" % (app_id, wf['id']),
            headers=headers)
        logs.append({"wf": wf, "logs": resp.json()})
    
    return json.dumps(logs)


@app.route("/app/repose/logs/show/<file_root>/<log_dir>/<log_file>", methods=["GET"])
def get_log_file(file_root, log_dir, log_file):
    headers = get_headers()
    if not headers:
        return auth_required_msg()

    #log_url = 'https://storage101.dfw1.clouddrive.com/v1/MossoCloudFS_cd7e91d2-fbdf-4fbd-be77-b24ae224d061/solum_logs/%s/%s'
    log_url = 'https://storage101.dfw1.clouddrive.com/v1/%s/solum_logs/%s/%s'
    resp = requests.get(log_url % (file_root, log_dir, log_file),
                         headers=headers)
    if resp.status_code == 401:
        return auth_required_msg()

    return resp.text

def get_auth_token(username, password):
    data = {'auth': {'passwordCredentials': {'username': username,'password': password}}}
    resp = requests.post(url, data=json.dumps(data), headers=headers)
    if resp.status_code != 200:
        print("Failed to authenticate the user %s. " % username)
        return None, None

    cloud_files_url = None
    try:
        for item in resp.json()['access']['serviceCatalog']:
            if item['name'] != 'cloudFiles':
                continue
            for endpoint in item['endpoints']:
                if endpoint['region'] != 'DFW':
                    continue
                cloud_files_url = endpoint['publicURL'].rsplit('/', 1)[-1]
                break
            break
    except Exception:
        cloud_files_url = None

    if cloud_files_url is None:
        # TODO: Return useful error message
        return None, None
        #raise Exception("Failed to get cloud files url for %s. " % username)
    token = resp.json()['access']['token']['id'], cloud_files_url
    return token

@app.route("/app/auth", methods=["POST", "GET"])
def authentication():
    headers = {'Content-Type': 'application/json',
               'Accept': 'application/json'}
    
    if request.method == "POST":
        if not request.data:
            return "error"
        obj = json.loads(request.data)
        username = obj['username']
        password = obj['password']
        token, cloud_files_url = get_auth_token(username, password)
        if token is None:
            #raise Exception("Auth required")
            return auth_required_msg()
        #auth_token = token
        print "Token:", token
        
        # Now get carina session ID, followed by apikey
        carina_auth_url = 'https://app.getcarina.com/api/auth'
        headers = {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json;charset=utf-8'}
        data = {
            'username': username,
            'password': password}
        resp = requests.post(carina_auth_url, headers=headers, data=json.dumps(data))
        session_id = resp.json()['sessionId']
        
        # get carina apikey
        carina_apikey_url = 'https://app.getcarina.com/api/auth/api-key'
        headers['X-Session-Id'] = session_id
        resp = requests.get(carina_apikey_url,
                            headers=headers)
        api_key = resp.json()['apiKey']
        return  json.dumps(
            {
                'token': token,
                'apikey': api_key,
                'cloud_files_url': cloud_files_url
            })

    if request.method == "GET":
        auth_url = url+"/"+request.headers['token']
        headers['X-Auth-Token'] = request.headers['token']
        resp = requests.get(auth_url, headers=headers)
        if resp.status_code == 200:
            return json.dumps({'ok': 'User token is valid.'})
        else:
            return auth_required_msg()

@app.route("/app/hostname")
def hostname():
    return json.dumps({'hostname': socket.gethostname()})

@app.route("/")
def hello():
    return "Hello World!"

if __name__ == "__main__":
    app.debug = True
    app.run(host='0.0.0.0', port=9000)
