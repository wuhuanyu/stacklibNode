var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const bbcRouter = require('./routes/bbcRouter');

import * as routers from './routes/index';

import * as models from './model/index';
const MBookRouter = require('./routes/mbookRouter');
const mongoose = require('mongoose');
// const redis = require('express-redis-cache')()  ;

const parser = require('./utils/urlParser').urlParser;
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/lib');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(parser);

let prevUse = app.use;

app.use = function (url) {
    let category = url.match(/^\/api\/v1\/(\w+)$/)[2];
    let fields,
        router;
    switch (category) {
        case 'bbc':
            fields = models.BBC.fields;
            router = types.BBCRouter;
            break;
        case 'medium':
            fields = models.Medium.fields;
            router = types.BBCRouter;
            break;
        case 'mbook':
            fields = models.fields;
            router = types.BBCRouter;
            break;


        default:
            break;

    }
}

app.use('/api/v1/mbook', bbc)
app.use('/api/v1/bbc', bbcRouter);

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req
        .app
        .get('env') === 'development'
        ? err
        : {};
    res.status(err.status);
    res.json({error: err.message});
    res.end();
});
module.exports = app;
