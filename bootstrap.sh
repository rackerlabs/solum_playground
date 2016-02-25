#!/bin/bash

apt-get update
echo "Installing Pre Reqs"
sudo apt-get install build-essential git \
  software-properties-common nginx -y

echo "Install nodejs"
curl -sL https://deb.nodesource.com/setup | sudo bash -
sudo apt-get install nodejs -y

echo "Configuring Nginx"
sudo cp /var/www/config/nginx_vhost /etc/nginx/sites-available/nginx_vhost
 
sudo rm -rf /etc/nginx/sites-available/default

sudo service nginx restart

echo "Install necessary packages"
su vagrant -c -l "npm config set prefix '~/npm_global'"
echo "NODE_PATH=$NODE_PATH:/home/vagrant/npm_global/lib/node_modules" >> /home/vagrant/.bashrc
echo "PATH=/home/vagrant/npm_global/bin:$PATH" >> /home/vagrant/.bashrc
echo "export NODE_PATH=$NODE_PATH:/home/vagrant/npm_global/lib/node_modules" >> ~/.bashrc
su vagrant -c -l "npm install -g npm"
su vagrant -c -l "npm install -g grunt-cli && npm install -g bower"
