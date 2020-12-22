https://www.mirantis.com/blog/introduction-to-kustomize-part-1-creating-a-kubernetes-app-out-of-multiple-pieces/

Kustomize is a tool that lets you create an entire Kubernetes application out of individual pieces — without touching the YAML for the individual components.  For example, you can combine pieces from different sources, keep your customizations — or kustomizations, as the case may be — in source control, and create overlays for specific situations. And it will be part of Kubernetes 1.14.

Kustomize enables you to do that by creating a file that ties everything together, or optionally includes “overrides” for individual parameters.



# to get the dashboard
1) kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0/aio/deploy/recommended.yaml 
2) kubectl proxy
3) http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/

## GET ACCESS TO DASHBOARD
kubectl create serviceaccount dashboard-admin-sa
kubectl create clusterrolebinding dashboard-admin-sa --clusterrole=cluster-admin --serviceaccount=default:dashboard-admin-sa
kubectl get secrets
kubectl describe secret dashboard-admin-sa-token-7g8j6

kubectl create serviceaccount jenkins
kubectl get serviceaccounts jenkins -o yaml
kubectl get secret jenkins-token-dqv88 -o yaml

kubectl describe pods your_pod 
kubectl logs your_pod
With your containers running, you can now access the application. To get the IP for the LoadBalancer, type:
kubectl get svc
