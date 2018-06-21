sed -e "s/--cluster-domain=cluster.local/--cluster-domain=cluster.local --node-ip=172.16.20.11/" /etc/systemd/system/kubelet.service.d/10-kubeadm.conf > 10-kubeadm.conf
diff /etc/systemd/system/kubelet.service.d/10-kubeadm.conf 10-kubeadm.conf
sudo mv -f 10-kubeadm.conf /etc/systemd/system/kubelet.service.d/
sudo systemctl daemon-reload
sudo systemctl restart kubelet
