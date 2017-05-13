var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var flash = require("express-flash");



//conexão com o mongo

mongoose.connect('mongodb://localhost/acadtec', function (err) {
    if(err){
        console.log("Erro ao conectar no mongo" + err);
    }else{
        console.log("Conexão com o mongo efetuada com sucesso");
    }

});

//var index = require('./routes/index');
//var users = require('./routes/users');

var session = require('express-session');

var load  = require('express-load');

var app = express();


//sessão
app.use(session({
    secret: "32dsf3423fsdf234",
    name: "cookie_name",
    //store: sessionStore, // connect-mongo session store
    proxy: true,
    resave: true,
    saveUninitialized: true
}));

app.use(flash());
//load("controllers").then("models").then("routes").into(app);
load('models').then('controllers').then('routes').into(app);




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//app.use('/', index);
//app.use('/users', users);

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
  res.render('error');
});

module.exports = app;
