sed -e "s/--cluster-domain=cluster.local/--cluster-domain=cluster.local --node-ip=172.16.20.11/" /etc/systemd/system/kubelet.service.d/10-kubeadm.conf > 10-kubeadm.conf
diff /etc/systemd/system/kubelet.service.d/10-kubeadm.conf 10-kubeadm.conf
sudo mv -f 10-kubeadm.conf /etc/systemd/system/kubelet.service.d/
sudo systemctl daemon-reload
sudo systemctl restart kubelet

# setup kubeadm
kubeadm init --pod-network-cidr=10.244.0.0/16 --apiserver-advertise-address=172.16.20.11 --service-cidr=10.244.0.0/16 > kubeadm-init-result.txt

# setup kubectl
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config

# check if kubectl setup
kubectl get node
