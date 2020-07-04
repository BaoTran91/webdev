const mongoose = require('mongoose');

const MONGO_USERNAME = 'bao';
const MONGO_PASSWORD = 'MASter15';
const MONGO_HOSTNAME = '127.0.0.1';
const MONGO_PORT = '27017';
const MONGO_DB = 'sharkinfo';

const mongoConnectionString = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

// DEPRECIATED -> mongoose.connect(url, {useNewUrlParser: true});
mongoose.connect(mongoConnectionString, {useNewUrlParser: true, useUnifiedTopology: true});
