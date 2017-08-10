var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const bbcRouter = require('./routes/bbcRouter');
const mongoose = require('mongoose');
// const redis = require('express-redis-cache')()  ;

const parser = require('./utils/urlParser').urlParser;
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/lib');
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(parser);
//app.use(redis.route(),(req,res,next)=>next());
app.use('/api/v1/bbc',bbcRouter);


// error handler
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status);
    res.json({error:err.message});
    res.end();
});
module.exports = app;
