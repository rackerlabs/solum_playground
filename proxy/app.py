from flask import Flask
from flask import request
app = Flask(__name__)
import json

import getpass
import json
import requests

username = None # raw_input('Username: ')
password = None #getpass.getpass('Password: ')

url = 'https://identity.api.rackspacecloud.com/v2.0/tokens'

data = {'auth': {'RAX-AUTH:domain': {'name': 'Rackspace'},
                 'passwordCredentials': {'username': username,
                                         'password': password}}}

headers = {'Content-Type': 'application/json',
           'Accept': 'application/json'}

SOLUM_URL = "https://dfw.solum.api.rackspacecloud.com"

@app.route("/app/language_packs", methods=["GET"])
def language_packs_list():
    headers['X-Auth-Token'] = request.headers['token']
    resp = requests.get(SOLUM_URL+"/v1/language_packs", headers=headers)
    return json.dumps(resp.json())

@app.route("/app/language_packs", methods=["POST"])
def language_pack_create():
    headers['X-Auth-Token'] = request.headers['token']
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
    if resp.status_code != 201:
        raise Exception(resp.json())
    return json.dumps(resp.json())

@app.route("/app/repose/list", methods=["POST", "GET"])
def app_list():
    headers['X-Auth-Token'] = request.headers['token']
    resp = requests.get(SOLUM_URL+"/v1/apps", headers=headers)
    return json.dumps(resp.json())

@app.route("/app/repose/delete/<app_id>", methods=["DELETE"])
def app_delete(app_id):
    headers['X-Auth-Token'] = request.headers['token']
    resp = requests.delete(SOLUM_URL+"/v1/apps/%s" % app_id, headers=headers)
    return json.dumps({"test": "Test"})

@app.route("/app/repose/create/", methods=["POST"])
def app_create():
    headers['X-Auth-Token'] = request.headers['token']
    try:
        data = json.loads(request.data)
    except ValueError:
        data = {}
    app_data = {
        "repo_token": "",
        "name": data.get("name", "TestApp"),
        "parameters": {},
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
    return json.dumps(resp.json())

@app.route("/app/repose/deploy/<app_id>/workflows", methods=["POST"])
def app_deploy(app_id):
    data = {"actions": ["unittest", "build", "deploy"]}
    headers['X-Auth-Token'] = request.headers['token']
    resp = requests.post(SOLUM_URL+"/v1/apps/%s/workflows" % app_id,
                         headers=headers,
                         data=json.dumps(data))
    return json.dumps({"test": "Test"})

@app.route("/app/repose/show/<app_id>", methods=["GET"])
def app_show(app_id):
    headers['X-Auth-Token'] = request.headers['token']
    resp = requests.get(SOLUM_URL+"/v1/apps/%s" % app_id,
                         headers=headers)
    return json.dumps(resp.json())

auth_token = None
def get_auth_token(username, password):
    data = {'auth': {'passwordCredentials': {'username': username,'password': password}}}
    resp = requests.post(url, data=json.dumps(data), headers=headers)
    token = json.loads(resp.content)['access']['token']['id']
    return token

@app.route("/app/auth", methods=["POST", "GET"])
def authentication():
    if request.method == "POST":
        if not request.data:
            return "error"
        obj = json.loads(request.data)
        username = obj['username']
        password = obj['password']
        token = get_auth_token(username, password)
        auth_token = token
        print "Token:", token
        return  json.dumps({'token': token})

    if request.method == "GET":
        return json.dumps({'success': 'success'})

@app.route("/")
def hello():
    return "Hello World!"

if __name__ == "__main__":
    app.debug = True
    app.run(host='0.0.0.0', port=9000)
