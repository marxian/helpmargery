var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var models = module.exports = {};

mongoose.connect(process.env.MONGOLAB_URI);

var Person = models.Person = mongoose.model('Person', new Schema({
	name: String,
	email: String
}));

var Booking = models.Booking = mongoose.model('Booking', new Schema({
	start: Date,
	end: Date,
	owner: {
		type: Schema.Types.ObjectId,
		ref: 'Person'
	},
	booker: {
		type: Schema.Types.ObjectId,
		ref: 'Person'
	}
}));

var Space = models.Space = mongoose.model('Space', new Schema({
	name: String,
	description: String,
	image: Buffer,
	bookings: [Booking],
	features: [String],
}));
