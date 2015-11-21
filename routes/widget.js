var express = require('express');
var router = express.Router();

var models = require('../models');

router.get('/sabot.js', function(req, res, next){
	res.set('Content-Type', 'text/javascript');
	var spaceId = req.query.spaceId;
	models.Space.findOne({_id: spaceId}, function(err, space) {
		if (!space) {
			err = new Error('Space not found');
		}
		if (err) {
			console.log(err);
			res.send('');
		} else {
			res.render('sabot', {
				spaceId: spaceId,
				widget_url: (process.env.NODE_ENV === 'production' ? 'http://helpmargery.herokuapp.com/' : 'http://localhost:3000/') + 'widget/'
			});
		}
	});
});


router.get('/:id', function(req, res, next) {
	models.Space.findOne({_id: req.params.id}, function(err, space) {
		if (!space) {
			err = new Error('Space not found');
		}
		if (err) {
			console.log(err);
			next(err);
		} else {
			res.render('widget', {
				title: 'Space: ' + space.name,
				space: space,
				unbranded: req.query.unbranded
			});
		}
	});
});

router.post('/:id/book', function(req, res, next) {
	models.Space.findOne({_id: req.params.id}, function(err, space) {
		if (!space) {
			err = new Error('Space not found');
		}
		if (err) {
			console.log(err);
			next(err);
		} else {
			// res.end(JSON.stringify(req.body));
			space.bookings.push(req.body);

			space.save(function(err, booking) {
				if (err) {
					console.log(err);
					next(err);
				} else {
					res.render('widget_success', {
						title: space.name,
						space: space,
						booking: booking
					});
				}
			});
		}
	});
});

module.exports = router;