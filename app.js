var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose=require('mongoose');
var session=require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/post');
var apiRouter =require('./api/routes/users.js');
var apiadminRouter = require('./api/routes/admin.js');
var apipostRouter =require('./api/routes/post');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret:'No@deHJ@$dsqtii!@#$',
  resave:false,
  saveUninitialized:true
}))

// mongoose.connect('mongodb://127.0.0.1/007nodejs');
mongoose.connect('mongodb+srv://thawdar:thaw12345@007nodejs-2gdzf.mongodb.net/test?retryWrites=true&w=majority');

var db=mongoose.connection;
db.on('error',console.error.bind(console,'MongoDB connection error from server'));

app.use(function (req,res,next) {
  res.locals.user =req.session.user;
  next();
});


app.use('/', indexRouter);
app.use('/api/users',apiRouter);
app.use('/api',apiadminRouter);
app.use('/api/post',apipostRouter);
app.use(function (req,res,next) {
  if(req.session.user){
    next();
  }else {
    res.redirect('/signin');
  }
  })
app.use('/users', usersRouter);
app.use('/post',postsRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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
