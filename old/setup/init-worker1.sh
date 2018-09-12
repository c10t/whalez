sed -e "s/--cluster-dns=10.96.0.10 --cluster-domain=cluster.local/--cluster-dns=10.244.0.10 --cluster-domain=cluster.local --node-ip=172.16.20.12/" /etc/systemd/system/kubelet.service.d/10-kubeadm.conf > 10-kubeadm.conf
diff /etc/systemd/system/kubelet.service.d/10-kubeadm.conf 10-kubeadm.conf
sudo mv -f 10-kubeadm.conf /etc/systemd/system/kubelet.service.d/
sudo systemctl daemon-reload
sudo systemctl restart kubelet

kubeadm join 172.16.20.11:6443 --token ${TOKEN} --discovery-token-ca-cert-hash sha256:${HASH}

# ensure worker cluster joined
kubectl get node

kubectl label node worker1 node-role.kubernetes.io/node=node "worker1" labeled

# ensure pod working
kubectl get pod -o wide -n kube-system
