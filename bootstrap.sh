#!/bin/bash

apt-get update
echo "Installing Pre Reqs"
sudo apt-get install build-essential git \
  software-properties-common nginx -y

curl -sL https://deb.nodesource.com/setup | sudo bash -
sudo apt-get install nodejs -y


echo "Configuring Nginx"
sudo cp /var/www/config/nginx_vhost /etc/nginx/sites-available/nginx_vhost
 
sudo rm -rf /etc/nginx/sites-available/default

sudo service nginx restart

su vagrant -c -l "npm config set prefix '~/npm_global'"
echo "NODE_PATH=$NODE_PATH:/home/vagrant/npm_global/lib/node_modules" >> /home/vagrant/.bashrc
echo "PATH=/home/vagrant/npm_global/bin:$PATH" >> /home/vagrant/.bashrc
echo "export NODE_PATH=$NODE_PATH:/home/vagrant/npm_global/lib/node_modules" >> ~/.bashrc
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
su vagrant -c -l "npm install -g generator-angular-fullstack"
