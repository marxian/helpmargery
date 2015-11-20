var express = require('express');
var router = express.Router();
var models = require('../models');

/* Index */
router.get('/', function(req, res, next) {
  res.render('index', {
	  title: 'Help Margery',
  });
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
router.get('/space', function(req, res, next) {
	res.render('space/create', {
		title: 'Create a new Space',
	});
});

router.post('/space', function(req, res, next) {
	models.Space.create(req.body, function(err, space) {
		if (err) {
			console.log(err);
			next(err);
		} else {
			res.render('space/success', {
				title: 'stuff',
				post: space
			});
		}
	});
});

router.get('/space/:id', function(req, res, next) {
	models.Space.findOne({_id: req.params.id}, function(err, space) {
		if (err) {
			console.log(err);
			next(err);
		} else {
			res.render('space/success', {
				title: 'stuff',
				post: space
			});
		}
	});
});

module.exports = router;
