var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var _ = require('lodash');
var moment = require('moment');
require('moment-range');
require('moment-duration-format');
// this middleware allows exposing flash messages through an express session (cookies!)
var flash = require('express-flash');
var session = require('cookie-session');

var routes = require('./routes/index');
var widget = require('./routes/widget');
var auth = require('./routes/auth');
var admin = require('./routes/admin');
var superadmin = require('./routes/superadmin');

var app = express();

// view engine setup
app.engine('ejs', require('ejs-mate'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// inject lodash/underscore into ejs
app.locals._ = _;
// inject moment into ejs
app.locals.moment = moment;

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  name: 'session',
  keys: ['m@rg3ry-rul3z', 'mfrgsad-r44ws3z']
}));
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
  res.locals.adminUsername = req.session.admin;
  res.locals.page = req.url && req.url.replace(/\//g, '_');
  res.locals.realpage = req.url;
  next();
});
app.use('/', routes);
app.use('/widget', widget);
app.use('/', auth);
app.use('/admin', admin);
app.use('/superadmin', superadmin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
