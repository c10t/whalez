# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu/xenial64"
    
  config.hostmanager.enabled = false
  config.hostmanager.manage_host = true
  config.hostmanager.include_offline = true
  config.hostmanager.ignore_private_ip = false

  #config.ssh.password = "vagrant"
  #config.ssh.insert_key = false
  #config.ssh.private_key_path = "~/.ssh/piyo.pem"
  #config.ssh.forward_agent = true
    
#  config.vm.define :wterm do |node|
#    node.vm.network :forwarded_port, guest: 22, host: 2889, id: "ssh"
#    node.vm.network :private_network, ip: "192.168.33.19"
#
#    node.vm.provider :virtualbox do |v|
#      v.customize["modifyvm", :id, "--memory", "1024"]
#    end
#
#    node.vm.provision :shell, path: "setup/init-ansible.sh"
#    node.vm.provision :shell, path: "setup/add-hosts.sh"
#    node.vm.synced_folder "synced/", "/home/vagrant/synced"
#  end

  config.vm.define :master do |node|
    node.vm.network :forwarded_port, guest: 22, host: 2900, id: "ssh"
    node.vm.network :private_network, ip: "192.168.33.20"

    node.vm.provider :virtualbox do |v|
      v.customize ["modifyvm", :id, "--memory", "1024"]
    end

    node.vm.provision :shell, path: "setup/init-kube.sh"
    node.vm.synced_folder "synced/", "/home/vagrant/synced"
  end

  config.vm.define :worker1 do |node|
    node.vm.network :forwarded_port, guest: 22, host: 2901, id: "ssh"
    node.vm.network :private_network, ip: "192.168.33.21"
 
    node.vm.provider :virtualbox do |v|
      v.customize ["modifyvm", :id, "--memory", "1024"]
    end

    node.vm.provision :shell, path: "setup/init-kube.sh"
    node.vm.synced_folder "synced/", "/home/vagrant/synced"
  end

  config.vm.define :worker2 do |node|
    node.vm.network :forwarded_port, guest: 22, host: 2902, id: "ssh"
    node.vm.network :private_network, ip: "192.168.33.22"

    node.vm.provider :virtualbox do |v|
      v.customize ["modifyvm", :id, "--memory", "1024"]
    end

    node.vm.provision :shell, path: "setup/init-kube.sh"
    node.vm.synced_folder "synced/", "/home/vagrant/synced"
  end
end
