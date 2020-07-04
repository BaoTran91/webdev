Minimal Node.js application for intro to Docker tutorial: https://www.digitalocean.com/community/tutorials/how-to-build-a-node-js-application-with-docker

# Install KOMPOSE:
# macOS
    curl -L https://github.com/kubernetes/kompose/releases/download/v1.19.0/kompose-darwin-amd64 -o kompose
    chmod +x kompose
    sudo mv ./kompose /usr/local/bin/kompose

# Build image:
    1) docker build -t bqt1991/node-k8-shark .
        The . in the command specifies that the build context (DockerFile) is the current directory.
    2) docker images
    3) docker login -u bqt1991
        Logging in this way will create a ~/.docker/config.json file in your user?s home directory with your Docker Hub credentials.
    4) docker push bqt1991/node-k8-shark


We will use these files to create different types of objects: Services, which will ensure that the Pods running our containers remain accessible;
Deployments, which will contain information about the desired state of our Pods; a PersistentVolumeClaim to provision storage for our database data;
a ConfigMap for environment variables injected at runtime; and a Secret for our application?s database user and password.
Some of these definitions will be in the files kompose will create for us, and others we will need to create ourselves.


# kompose offers multiple options for translating your resources. You can: - Create yaml files based on the service definitions in your docker-
# compose.yaml file with kompose convert. - Create Kubernetes objects directly with kompose up. - Create a Helm chart with kompose convert -c.
    1) kompose convert


# Creating Kubernetes Secrets
## encrypt

echo -n 'bao' | base64        -> YmFv
echo -n 'MASter15' | base64   -> TUFTdGVyMTU=

Note: Kubernetes objects are typically defined using YAML, which strictly forbids tabs and requires two spaces for indentation.
If you would like to check the formatting of any of your yaml files, you can use a linter or test the validity of your syntax using
kubectl create with the -- dry-run and --validate flags:
kubectl create -f secret.yaml --dry-run --validate=true


nodejs-deployment.yaml
We will need to add references to our Secret to the MONGO_USERNAME and MONGO_PASSWORD variables listed here,
so that our application will have access to those values. Instead of including a configMapKeyRef key to point
to our nodejs-env ConfigMap, as is the case with the values for MONGO_DB and MONGO_PORT, we?ll include a secretKeyRef
key to point to the values in our mongo-secret secret.


db-deployment.yaml
In this file, we will add references to our Secret for following variable keys: MONGO_INITDB_ROOT_USERNAME
and MONGO_INITDB_ROOT_PASSWORD. The mongo image makes these variables available so that you can modify the
initialization of your database instance. MONGO_INITDB_ROOT_USERNAME and MONGO_INITDB_ROOT_PASSWORD together
create a root user in the admin authentication database and ensure that authentication is enabled when the database container starts.

#Creating the Database Service and an Application Init Container

db-service.yaml
The selector that we have included here will match this Service object with our database Pods,
which have been defined with the label io.kompose.service: db by kompose in the db- deployment.yaml file


nodejs-deployment.yaml
Next, let?s add an Init Container field to the containers array in nodejs-deployment.yaml. This will create an Init Container that we
can use to delay our application container from starting until the db Service has been created with a Pod that is reachable.
This Init Container uses the BusyBox image, a lightweight image that includes many UNIX utilities.
In this case, we?ll use the netcat utility to poll whether or not the Pod associated with the db Service
is accepting TCP connections on port 27017.
This container command replicates the functionality of the wait-for script that we removed from our docker-compose.yaml file in Step 3.

# Modifying the PersistentVolumeClaim and Exposing the Application Frontend
IF USING CLOUD SERVICES

# RUN

kubectl create -f nodejs-service.yaml,nodejs-deployment.yaml,nodejs-env-configmap.yaml,db-service.yaml,db-deployment.yaml,dbdata-persistentvolumeclaim.yaml,secret.yaml,loadbalancer.yaml

# to get the dashboard
1) kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.0.0/aio/deploy/recommended.yaml
2) kubectl proxy
3) http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/

## GET ACCESS TO DASHBOARD
kubectl create serviceaccount dashboard-admin-sa
kubectl create clusterrolebinding dashboard-admin-sa --clusterrole=cluster-admin --serviceaccount=default:dashboard-admin-sa
kubectl get secrets
kubectl describe secret dashboard-admin-sa-token-7g8j6

kubectl describe pods your_pod
kubectl logs your_pod
With your containers running, you can now access the application. To get the IP for the LoadBalancer, type:
kubectl get svc


# To expose the service to Internet, you have to put your VMs behind a load balancer. To do that we create a Kubernetes Service.
kubectl expose deployment nodejs --type=LoadBalancer --name=my-service
kubectl get services my-service

ADDED LOAD BALANCER YAML


