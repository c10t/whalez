sed -e "s/--cluster-dns=10.96.0.10 --cluster-domain=cluster.local/--cluster-dns=10.244.0.10 --cluster-domain=cluster.local --node-ip=172.16.20.12/" /etc/systemd/system/kubelet.service.d/10-kubeadm.conf > 10-kubeadm.conf
diff /etc/systemd/system/kubelet.service.d/10-kubeadm.conf 10-kubeadm.conf
sudo mv -f 10-kubeadm.conf /etc/systemd/system/kubelet.service.d/
sudo systemctl daemon-reload
sudo systemctl restart kubelet
