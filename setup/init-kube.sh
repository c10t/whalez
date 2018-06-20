echo net.bridge.bridge-nf-call-iptables = 1 >> /etc/sysctl.conf
sysctl -p

apt-get update
apt-get install -y apt-transport-https ca-certificates curl software-properties-common

# add repo Docker-CE
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
add-apt-repository "deb https://download.docker.com/linux/$(. /etc/os-release; echo "$ID") $(lsb_release -cs) stable"
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -

# add repo Kubernetes
cat <<EOF2 >/etc/apt/sources.list.d/kubernetes.list
deb http://apt.kubernetes.io/ kubernetes-xenial main
EOF2

# install Docker-CE
apt-get update
apt-get install -y docker-ce=$(apt-cache madison docker-ce | grep 17.03 | head -1 | awk '{print $3}')
usermod -aG docker vagrant

# install Kubernetes
#apt-get install -y kubelet=1.9.6-00 kubeadm=1.9.6-00 kubectl=1.9.6-00
apt-get install -y kubelet kubeadm kubectl
