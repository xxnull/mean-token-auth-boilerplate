//includes
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');

//routes
var routes = require('./app/routes/index');
var login = require('./app/routes/login');
var tasks = require('./app/routes/tasks');
var publishers = require('./app/routes/publishers');

//db connection
mongoose.connect('mongodb://localhost/task-manager');

var app = express();

//for req.body parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//route to front-end code
app.use(express.static(path.join(__dirname, '/public/dist')));

//set view engine
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs');

//routes
app.use('/login', login);
app.use('/publishers', publishers);
app.use('/tasks', tasks);
app.use('/', routes);

//web server listening
app.listen(8000);