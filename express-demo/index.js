const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const config = require('config');
const morgan = require('morgan'); // middleware, HTTP request logger middleware for node.js
const helmet = require('helmet'); // middleware, Helmet helps you secure your Express apps by setting various HTTP headers. 
const Joi = require('joi');
const logger = require('./middleware/logger'); // middleware 

// routers !!!!!!!!!!!
const courses = require('./routes/courses'); // router za kurseve
const home = require('./routes/home'); // router za home rutu
 
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './view');

//console.log(`NODE_ENV: ${process.env.NODE_ENV}`); //environment variable
//console.log(`app: ${app.get('env')}`);


app.use(express.json());
app.use(express.urlencoded({ extended: true}));  // middleware za engodiranje request  req.body
app.use(express.static('public')); // middleware  upucuje na folder public vracea fail 
                                   // npr. vraca file na ruti http://localhost:3000/readme.txt

app.use(helmet()); // middleware
app.use('/api/courses',  courses);  // router za /api/courses
app.use('/', home);


//configuration
console.log( 'Application Name: ' + config.get('name'));
console.log('Mail Serve: ' + config.get('mail.host'));
console.log('Mail password: ' + config.get('mail.password'));

if (app.get('env') === 'development'){
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...');
}

//app.use(morgan('tiny')); // Using a predefined format string

app.use(logger); // use middleware logger.js


app.use(function(req, res, next){
    console.log('Authenticate...');
    next();
});




 const port = process.env.PORT || 3000;

 app.listen(port, () => console.log(`Listening on port ${port}...`));




 
