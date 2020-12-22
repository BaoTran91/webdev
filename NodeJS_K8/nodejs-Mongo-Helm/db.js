const mongoose = require('mongoose');


const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB,
    MONGO_REPLICASET
} = process.env;


const mongoConnectionString = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?replicaSet=$\{MONGO_REPLICASET}&authSource=admin`;


const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    connectTimeoutMS: 10000,
};


mongoose.connect(mongoConnectionString, options).then( function() {
    console.log('MongoDB is connected');
}).catch( function(err) {
    console.log(err);
});