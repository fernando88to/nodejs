var express           = require('express'),
    path              = require('path'),
    favicon           = require('serve-favicon'),
    logger            = require('morgan'),
    cookieParser      = require('cookie-parser'),
    bodyParser        = require('body-parser'),
    mongoose          = require("mongoose"),
    flash             = require("express-flash"),
    moment            = require("moment"),
    expressValidator  = require("express-validator");




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


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//ativa o help, dessa forma ele fica disponiveis em todas as respostas,
//assim não precisa ficar passando no res.render()
app.use(function(req, res, next){
    res.locals.moment = moment;
    next();
});


load('models').then('controllers').then('routes').into(app);







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
