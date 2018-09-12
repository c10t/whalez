sudo apt-get update
sudo apt-get install -y python-software-properties
sudo apt-get install -y software-properties-common
sudo apt-get install -y python-pip python-dev
sudo apt-get install -y libxml2-dev libxslt1-dev
sudo apt-get install -y zlib1g-dev libffi-dev libssl-dev

sudo pip install markupsafe
sudo pip install --upgrade pip six
sudo pip install cryptography
sudo pip install slackclient
sudo pip install ansible\==2.4.1

sudo mkdir -p /etc/ansible
sudo touch /etc/ansible/hosts
