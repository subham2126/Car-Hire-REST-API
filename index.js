const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const hostname = '127.0.0.1';
const port = 3000;
const routes = require('./routes/api.js');
//set up an express app

const app = express();

//connect to mongodb
mongoose.connect('mongodb://localhost/carsgo');
mongoose.Promise = global.Promise; 
 //send static file directly if available in the public folder
//above, we'll store the front end
app.use(bodyparser.json());
//use the routes
app.use('/api',routes);



app.use(express.static('public'));
//error handling middleware
app.use(function(err, req, res, next){
	//console.log(err);
	res.status(422).send({error: err.message});
});

app.get('/api', function(req, res){ 
	console.log('GET request');
	res.send({name: 'Angana'});
});

app.post('/api', function(req, res){ 
	console.log('GET request');
	res.send({name: 'Angana'});
});

//listen for requests
app.listen(port, hostname, function(){
	console.log("now listening to requests"); 
});

