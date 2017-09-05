var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var users = require('./routes/users');
var secureRoutes = require('./routes/secureRoutes');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var app = express();
var jwt =require('jsonwebtoken');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/database',{
  useMongoClient: true
});
var db = mongoose.connection;


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
process.env.SECRET_KEY='fgvshfdui72345678!@#$RDFGhkifshb'
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//session must be set before router
app.use(session({
  cookie: {
    path    : '/',
    httpOnly: false,
    maxAge  : 30 * 60 * 1000,
  },
  secret: 'secret',
  saveUninitialized: true,
  resave: true,
  duration: 30 * 60 * 1000,
  httpOnly: true,
  secure: true,
  ephemeral: true
}));


app.use('/', index);
app.use('/users', users);
app.use('/secure-api', secureRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use(passport.initialize());
app.use(passport.session());


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
