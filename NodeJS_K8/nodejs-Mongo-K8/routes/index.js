const express = require('express');
const router = express.Router();
const path = require('path');

//The router.use function loads a middleware function that will log the router’s requests and pass them on to the application’s routes.
router.use (function (req,res,next) {
    console.log('/' + req.method); next();
});

//users visit our application, the first place we want to send them is to the index.html landing page that we have in our views directory.
router.get('/',function(req,res){ res.sendFile(path.resolve('views/index.html'));
});

module.exports = router;