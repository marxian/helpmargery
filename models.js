var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var models = module.exports = {};

mongoose.connect(process.env.MONGOLAB_URI);

var bookingSchema = new Schema({
	start: Date,
	end: Date,

});

models.Booking = mongoose.model('Booking', bookingSchema);

var spaceSchema = new Schema({
	name: String,
	description: String,
	image: Buffer,
	bookings: []
});

models.Space = mongoose.model('Space', spaceSchema);