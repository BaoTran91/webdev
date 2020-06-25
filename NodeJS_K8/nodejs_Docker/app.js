const express = require('express');
const app = express();
const router = express.Router();
const path = __dirname + '/views/';
const port = 7080;


//The router.use function loads a middleware function that will log the router’s requests and pass them on to the application’s routes.
// These are defined in the subsequent functions, which specify that a GET request to the base project URL
// should return the index.html page, while a GET request to the /sharks route should return sharks.html.
router.use(function (req,res,next) {
router.use(function (req,res,next) {
    console.log('/' + req.method);
    next();
});
router.get('/', function(req,res){
    res.sendFile(path + 'index.html');
});
router.get('/sharks', function(req,res){
    res.sendFile(path + 'sharks.html');
});

//mount the router middleware and the application’s static assets and tell the app to listen on port 8080:
app.use(express.static(path));
app.use('/', router);
app.listen(port, function () {
    console.log('Example app listening on port 7080!')
})