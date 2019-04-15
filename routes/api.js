const express = require('express');
const Car = require('../models/cars.js')
const router = express.Router(); // create express router


// get a list of cars from the db
router.get('/cars', function(req,res,next){
	/*Car.find({}).then(function(cars){
		res.send(cars); //list everything
	});*/
	Car.aggregate([
		{
			$geoNear:
		    {
				 near: {
				 	type: 'Point', 
					coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
				 },
				 distanceField: "dist.calculated",
				 includeLocs: "dist.location",
				 maxDistance: 100000, 
				 spherical: true 
			}
		}
	]).then(function(cars){
		res.send(cars);
	}).catch(next);
	/*Car.geoNear(
		{type: 'Point', 
		coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
		{maxDistance: 100000, spherical: true} //100000 meters
	).then(function(cars){
		res.send(cars);
	});*/
});

//add a new car to the db
router.post('/cars', function(req,res,next){ 
	//var car = new Car(req.body); // info in the body
	//car.save();
	Car.create(req.body).then(function(car){ // create new record/instance using the body
		res.send(car); // then because .create takes sometime and send only after that
	}).catch(next); // post and save
	
});

// update a car in the database
router.put('/cars/:id', function(req,res,next){
	Car.findByIdAndUpdate({_id: req.params.id}, req.body)
	.then(function(){ 
		Car.findOne({_id: req.params.id}).then(function(car){ // get updated version
			res.send(car); 
		});
	});
	//res.send({type: 'PUT'});
});

//delete a car from the db
router.delete('/cars/:id', function(req,res,next){
	//console.log(req.params.id);
	Car.findByIdAndRemove({_id: req.params.id}).
	then(function(car){ 
		res.send(car); 
	}).catch(next);
});

module.exports = router;
