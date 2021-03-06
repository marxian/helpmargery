var express = require('express');
var router = express.Router();
var models = require('../models');
var _ = require('lodash');
var format = require('string-format');
format.extend(String.prototype);

router.get('/login', function(req, res, next) {
	if (req.session.admin) {
		res.redirect('/admin/spaces');
	} else {
		res.render('login', {
			title: 'Login',
		});
	}
});

router.post('/login', function(req, res, next) {
	req.session.admin = req.body.username;
	res.redirect('/admin/spaces');
});

router.get('/logout', function(req, res) {
	req.session = null;
	res.redirect('/');
});

module.exports = router;