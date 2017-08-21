var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const bbcRouter = require('./routes/bbcRouter');
const mediumRouter = require('./routes/mediumRouter');

const commonError = require('./utils/commonError');
const commonMsg = require('./utils/commonMsg');
import * as routers from './routes/index';
import * as models from './model/index';
const mongoose = require('mongoose');
const parser = require('./utils/urlParser').urlParser;
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/stacklib');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(parser);

app.use(function (req, res, next) {
    req.app.utils = {
        commonMsg,
        commonError
    };

    let category = req
        .url
        .match(/^\/api\/v1\/(\w+)\/.*$/)[1];
    console.log(category);
    let defaultFields;
    switch (category) {
        case 'bbc':
            defaultFields = models.BBC.fields;
            break;
        case 'medium':
            defaultFields = models.Medium.fields;
            break;
        case 'mbook':
            defaultFields = models.MBook.fields;
            break;
        case 'mbookr':
            defaultFields = models.MBookR.fields;
            break;
        case 'cnn':
            defaultFields = models.CNN.fields;
            break;
        case 'reuters':
            defaultFields = models.Reuters.fields;
            break;
        default:
            break;
    }

    let isQueryValid = true;
    let fields = req.query.fields
        ? req
            .query
            .fields
            .split(',')
        : defaultFields;
    if (!fields.every(f => defaultFields.indexOf(f) > -1)) {
        isQueryValid = false;
    }
    if (!isQueryValid) {
        next(commonError.get400(commonMsg.QueryParamsInvalid));
    } else {
        req.checked.fields = fields;
        next();
    }
});

app.use('/api/v1/bbc', routers.BBCRouter);
app.use('/api/v1/mbook', routers.MBookRouter);
app.use('/api/v1/medium', routers.MediumRouter);
app.use('/api/v1/mbookr', routers.MBookRRouter);
app.use('/api/v1/cnn', routers.CNNRouter);
app.use('/api/v1/reuters',routers.ReutersRouter);

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req
        .app
        .get('env') === 'development'
        ? err
        : {};
    res.status(err.status || 400);
    res.json({error: err.message});
    res.end();
});
module.exports = app;
