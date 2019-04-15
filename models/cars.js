const mongoose  = require('mongoose');

const Schema = mongoose.Schema;

//create geolocation Schema
const GeoSchema = new Schema({
	type: {
		type: String,
		default: "Point"
	},
	coordinates: {
		type: [Number],
		index: "2dsphere"
	}
});

//create cars Schema and model
const carsSchema = new Schema({
	car_id : Number,
	car_name : {
	type: String,
	required: [true, 'car_name is required']
		},
	driver: {
		type:String
	},
	available: {
		type: Boolean,
		default: false
	},

	// add geo location: uses geo json
	geometry: GeoSchema
});


const Car = mongoose.model('car', carsSchema);

module.exports = Car; 