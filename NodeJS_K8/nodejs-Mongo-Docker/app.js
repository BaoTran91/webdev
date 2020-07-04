const express = require('express');
const app = express();
const router = express.Router();
const db = require('./db');
const sharks = require('./routes/sharks');

const path = __dirname + '/views/';
const port = process.env.PORT || 7080;

//The app.engine method tells the application to map the EJS template engine to HTML files,
// while app.set defines the default view engine.
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//Adding this function will enable access to the parsed POST data from our shark information form.
app.use(express.urlencoded({ extended: true }));
//mount the router middleware and the application’s static assets and tell the app to listen on port 8080:
app.use(express.static(path));
app.use('/sharks', sharks);

app.listen(port, function () {
  console.log(`Example app listening on port ${port}`)
})
