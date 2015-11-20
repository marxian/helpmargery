var express = require('express');
var router = express.Router();
var models = require('../models');
var format = require('string-format');
format.extend(String.prototype);

/* Index */
router.get('/', function(req, res, next) {
  res.render('index', {});
});

/* Spaces */
router.get('/spaces', function(req, res, next) {
	models.Space.find({}, function(err, docs) {
		var spaces = docs;
		res.render('spaces/index', {
			title: 'All your spaces belong to us',
			spaces: spaces
		});
	});
});

/* Space */
router.get('/new', function(req, res, next) {
	res.render('space/create', {
		title: 'Create a new Space',
		facilities: models.Space.schema.path('facilities').options.enum,
		hiring_models: models.Space.schema.path('hiring_model').options.enum,
		hiring_granularity: models.Space.schema.path('hiring_granularity').options.enum
	});
});
router.post('/new', function(req, res, next) {
	models.Space.create(req.body, function(err, space) {
		if (err) {
			console.log(err);
			next(err);
		} else {
			req.flash('success', 'Your new space: {name} has been created.'.format(space));
			res.redirect('/spaces');
		}
	});
});

router.get('/space/:id', function(req, res, next) {
	models.Space.findOne({_id: req.params.id}, function(err, space) {
		if (err) {
			console.log(err);
			next(err);
		} else {
			res.render('space/view', {
				title: 'this is the page for space: ' + space.name,
				space: space
			});
		}
	});
});



module.exports = router;
