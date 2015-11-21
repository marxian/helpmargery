var express = require('express');
var router = express.Router();
var models = require('../models');
var _ = require('lodash');
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
			spaces: spaces,
			facilities: models.Space.schema.path('facilities').options.enum
		});
	});
});

router.get('/space/:id', function(req, res, next) {
	models.Space.findOne({_id: req.params.id}, function(err, space) {
		if (!space) {
			err = new Error('Space not found');
		}
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
