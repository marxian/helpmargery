var express = require('express');
var router = express.Router();
var models = require('../models');
var multer = require('multer');
var storage = multer.memoryStorage();
var uploader = multer({storage: storage});
var _ = require('lodash');
var format = require('string-format');
format.extend(String.prototype);



/* Spaces */
router.get('/spaces', function(req, res, next) {
	models.Space.find({}, function(err, docs) {
		var spaces = docs;
		res.render('superadmin', {
			title: 'All your spaces belong to us',
			spaces: spaces
		});
	});
});


router.get('/delete/:id', function(req, res, next) {
	models.Space.findById(req.params.id, function(err, space) {
		if (!space) {
			err = new Error('Space not found');
		}
		if (err) {
			console.log(err);
			next(err);
		} else {
			space.remove(function(err, ok){
				req.flash('success', 'Your space has been deleted.');
				res.redirect('/superadmin/spaces');
			});
		}
	});
});

module.exports = router;