Minimal Node.js application for intro to Docker tutorial: https://www.digitalocean.com/community/tutorials/how-to-build-a-node-js-application-with-docker

# GET HELM
    curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3
    chmod 700 get_helm.sh
    ./get_helm.sh
-> helm installed into /usr/local/bin/helm

# add replica to url in db.js

    docker build -t bqt1991/node-replicas .
    docker push bqt1991/node-replicas

# Create KeyFile
We will use the openssl command with the rand option to generate a 756 byte random string for the keyfile:
The key itself must be between 6 and 1024 characters long, consisting only of characters in the base64 set.
    openssl rand -base64 756 > key.txt

# Create Secret using keyfile
    kubectl create secret generic keyfilesecret -- from-file=key.txt
    rm key.txt


# Create Secret using YAML for dmongo
    kubectl create -f mongodb-values.yaml --dry-run --validate=true
    kubectl create -f secret.yaml


# Before deploying the mongodb-replicaset chart, you will want to update the stable repo with the helm repo update command:
helm repo add stable https://kubernetes-charts.storage.googleapis.com/
helm repo list
helm repo update
helm install your_release_name -f your_values_file.yaml --dry-run --debug your_chart
helm install mongo -f mongodb-values.yaml stable/mongodb-replicaset
helm uninstall mongo

kubectl get statefulset
kubectl get svc

1. After the statefulset is created completely, one can check which instance is primary by running:

    $ for ((i = 0; i < 3; ++i)); do kubectl exec --namespace default mongo-mongodb-replicaset-$i -- sh -c 'mongo --eval="printjson(rs.isMaster())"'; done

2. One can insert a key into the primary instance of the mongodb replica set by running the following:
    MASTER_POD_NAME must be replaced with the name of the master found from the previous step.

    $ kubectl exec --namespace default MASTER_POD_NAME -- mongo --eval="printjson(db.test.insert({key1: 'value1'}))"

3. One can fetch the keys stored in the primary or any of the slave nodes in the following manner.
    POD_NAME must be replaced by the name of the pod being queried.

    $ kubectl exec --namespace default POD_NAME -- mongo --eval="rs.slaveOk(); db.test.find().forEach(printjson)"

# Create new Helm chart directory
    helm create nodeapp
    helm install nodejs ./nodeapp

To access the mongo shell on your Pods, you can use the kubectl exec command and the username you used to create your mongo-secret in Step 2.
Access the mongo shell on the first Pod in the StatefulSet with the following command:
  CHECK IN PRIMARY
    kubectl exec -it mongo-mongodb-replicaset-0 -- mongo -u bao -p --authenticationDatabase admin
    rs.isMaster()
    use sharkinfo
    db.setSlaveOk(1) <- Permit the read operation of the documents in the sharks collection:
    show collections
    db.sharks.find()
  CHECK IN 2nd
    kubectl exec -it mongo-mongodb-replicaset-1 -- mongo -u bao -p --authenticationDatabase admin