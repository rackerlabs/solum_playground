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

@app.route("/app/repose/list", methods=["POST", "GET"])
def app_list():
    headers['X-Auth-Token'] = request.headers['token']
    resp = requests.get(SOLUM_URL+"/v1/apps", headers=headers)
    return json.dumps(resp.json())
    #return json.dumps({"test": "Test"})


@app.route("/app/repose/delete/<app_id>", methods=["DELETE"])
def app_delete(app_id):
    headers['X-Auth-Token'] = request.headers['token']
    resp = requests.delete(SOLUM_URL+"/v1/apps/%s" % app_id, headers=headers)
    return json.dumps({"test": "Test"})

@app.route("/app/repose/deploy/<app_id>/workflows", methods=["POST"])
def app_deploy(app_id):
    data = {"actions": ["unittest", "build", "deploy"]}
    headers['X-Auth-Token'] = request.headers['token']
    resp = requests.post(SOLUM_URL+"/v1/apps/%s/workflows" % app_id,
                         headers=headers,
                         data=json.dumps(data))
    import pdb;pdb.set_trace()
    return json.dumps({"test": "Test"})

@app.route("/app/repose/show/<app_id>", methods=["GET"])
def app_show(app_id):
    headers['X-Auth-Token'] = request.headers['token']
    resp = requests.get(SOLUM_URL+"/v1/apps/%s" % app_id,
                         headers=headers)
    import pdb;pdb.set_trace()
    return json.dumps(resp.json())

auth_token = None
def get_auth_token(username, password):
    data = {'auth': {'passwordCredentials': {'username': username,'password': password}}}
    resp = requests.post(url, data=json.dumps(data), headers=headers)
    token = json.loads(resp.content)['access']['token']['id']
    return token

@app.route("/app/auth", methods=["POST", "GET"])
def world():
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
