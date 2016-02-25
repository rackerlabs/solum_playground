# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.network :forwarded_port, guest: 9090, host: 9090, auto_correct: true

  config.vm.provider "virtualbox" do |v|
      v.name = "Repose UI"
      v.customize ["modifyvm", :id, "--memory", "2048"]
      v.cpus = 2
  end

  config.vm.provision "shell", path: "bootstrap.sh"
end
