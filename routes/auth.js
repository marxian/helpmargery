var express = require('express');
var router = express.Router();
var models = require('../models');
var _ = require('lodash');
var format = require('string-format');
format.extend(String.prototype);

router.use(function(req, res, next) {
	res.locals.adminUsername = req.session.admin;
	res.locals.page = req.url && req.url.replace(/\//g, '_');
	next();
});

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
	req.session.admin = null;
	res.redirect('/');
});

module.exports = router;