#!/bin/bash

#bower install --allow-root
grunt serve --debug --verbose&
cd proxy
python app.py

