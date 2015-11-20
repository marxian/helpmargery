var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var model = mongoose.model;

var models = modules.exports = {};

var spaceSchema = new Schema({
	name: String,
	description: String,
	image: Buffer
});

models.Space = model('Space', spaceSchema);