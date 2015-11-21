var express = require('express');
var router = express.Router();
var models = require('../models');
var multer = require('multer');
var storage = multer.memoryStorage();
var uploader = multer({storage: storage});
var _ = require('lodash');
var format = require('string-format');
format.extend(String.prototype);

/* Index */
router.get('/', function(req, res, next) {
  res.render('index', {});
});

/* Spaces */
router.get('/spaces', function(req, res, next) {
	models.Space.find({'owner.name': req.session.admin}, function(err, docs) {
		var spaces = docs;
		res.render('admin/spaces/index', {
			title: 'Your Spaces',
			spaces: spaces,
			facilities: models.Space.schema.path('facilities').options.enum,
			hiring_models: models.Space.schema.path('hiring_model').options.enum,
			hiring_granularity: models.Space.schema.path('hiring_granularity').options.enum
		});
	});
});

/* Space */
router.get('/new', function(req, res, next) {
	res.render('admin/space/create', {
		title: 'Create a new Space',
		facilities: models.Space.schema.path('facilities').options.enum,
		hiring_models: models.Space.schema.path('hiring_model').options.enum,
		hiring_granularity: models.Space.schema.path('hiring_granularity').options.enum,
		updateSpace: null
	});
});
router.post('/new', uploader.single('image'), function(req, res, next) {
	if (req.file) {
		req.body.image = _.pick(req.file, 'buffer', 'originalname', 'mimetype');
	}
	models.Space.create(req.body, function(err, space) {
		if (!space) {
			err = new Error('Space not found');
		}
		if (err) {
			console.log(err);
			next(err);
		} else {
			req.flash('success', 'Your new space: {name} has been created.'.format(space));
			res.redirect('/admin/spaces');
		}
	});
});

router.get('/edit/:id', function(req, res, next) {
	models.Space.findOne({_id: req.params.id}, function(err, space) {
		if (!space) {
			err = new Error('Space not found');
		}
		if (err) {
			console.log(err);
			next(err);
		} else {
			res.render('admin/space/create', {
				title: 'Edit ' + space.name,
				facilities: models.Space.schema.path('facilities').options.enum,
				hiring_models: models.Space.schema.path('hiring_model').options.enum,
				hiring_granularity: models.Space.schema.path('hiring_granularity').options.enum,
				updateSpace: space
			});
		}
	});
});
router.post('/edit/:id', uploader.single('image'), function(req, res, next) {
	models.Space.findOne({_id: req.params.id}, function(err, space) {
		if (!space) {
			err = new Error('Space not found');
		}
		if (err) {
			console.log(err);
			next(err);
		} else {
			if (req.file) {
				req.body.image = _.pick(req.file, 'buffer', 'originalname', 'mimetype');
			}
			Object.keys(req.body).forEach(function(key) {
				if (req.body[key]) {
					space[key] = req.body[key];
				}
			});
			space.save(function(err) {
				if (err) {
					console.log(err);
					next(err);
				} else {
					req.flash('updated', 'Successfully updated {name}'.format(space));
					res.redirect('/admin/spaces');
				}
			});
		}
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
			res.render('admin/space/view', {
				title: 'this is the page for space: ' + space.name,
				space: space
			});
		}
	});
});

module.exports = router;
