const path = require('path');
const Shark = require('../models/sharks');

//create an index function to display the sharks page with the input form.
exports.index = function (req, res) {
    res.sendFile(path.resolve('views/sharks.html'));
};

//function called create to make a new shark entry in your sharks collection
exports.create = function (req, res) {
    var newShark = new Shark(req.body);
    console.log(req.body);
    newShark.save(function (err) {
        if(err) {
            res.status(400).send('Unable to save shark to database') } else {
            res.redirect('/sharks/getshark');
        }
    });
};

// list function will display the collection’s contents back to the user.
exports.list = function (req, res) {
    Shark.find({}).exec(function (err, sharks) {
        if (err) {
            return res.send(500, err);
        }

        res.render('getshark', {
            sharks: sharks
        });
    });
};