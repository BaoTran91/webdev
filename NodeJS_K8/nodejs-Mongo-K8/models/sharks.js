//IMPORT MONGOOSE to connect to MongoDB
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//CREATE A SHARK SCHEMA
const Shark = new Schema ({
    name: { type: String, required: true },
    character: { type: String, required: true },
});

module.exports = mongoose.model('Shark', Shark)