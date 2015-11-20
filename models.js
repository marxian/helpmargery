var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var models = module.exports = {};

var facilityTypes = [
	'WiFi',
	'Projector',
	'Kitchen',
	'Bar'
];

var hiringModels = [
	'Fixed cost',
	'Deposit'
];

var hiringGranularities = [
	'per day',
	'per half-day/evening',
	'per hour'
];

mongoose.connect(process.env.MONGOLAB_URI);

var bookingSchema = new Schema({
	start: Date,
	end: Date
});

models.Booking = mongoose.model('Booking', bookingSchema);

var spaceSchema = new Schema({
	name: String,
	description: String,
	image: Buffer,
	facilities: { type: [String], enum: facilityTypes },
	bookings: [models.Booking],
	address1: String,
	address2: String,
	county: String,
	town: String,
	postcode: String,
	hiring_model: { type: String, enum: hiringModels },
	hiring_granularity: {type: String, enum: hiringGranularities},
	hire_charge: Number
});

models.Space = mongoose.model('Space', spaceSchema);