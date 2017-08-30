var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var session = require('express-session');
var mongoose = require('mongoose');

var login = require('./routes/login');
var signup = require('./routes/SignUp');
var problem = require('./routes/problem');
var InsertP = require('./routes/InsertP');
var app = express();
var db = mongoose.connection;


db.on('err',console.error);
db.once('open',function(){
    console.log('connected to mongodb');
});
mongoose.connect("mongodb://localhost:27017/QRdb",function(err){
    if(err) {
        console.log('DB Error');
        throw err;
    }else{
        console.log('Connect sucess!');
    }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html',require('ejs').renderFile);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'rnpfqEnfqTPfqEptq',
    resave: false,
    saveUninitialized: true
}));

app.use('/login',login);
app.use('/SignUp',signup);
app.use('/problem',problem);
app.use('/InsertP',InsertP);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('404.html');
});

module.exports = app;