const path = require('path');
const commonError = require('./utils/commonError');
const commonMsg = require('./utils/commonMsg');
const mongoose = require('mongoose');
const parser = require('./utils/urlParser').urlParser;
import * as routes from './routes/index';
const ApiApp = require('express')();
import * as models from './model/index';


mongoose.connect("mongodb://localhost:27017/stacklib");
ApiApp.use(parser);
/**
 * 补全Api请求的相关字段
 */
ApiApp.use((req, res, next) => {
    req.app.utils = {
        commonMsg,
        commonError
    };
    let category = req
        .url
        .match(/^\/(\w+)\/.*$/)[1];
    let defaultFields;
    switch (category) {
        case 'bbc':
            console.log(category);
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

ApiApp.use('/bbc', routes.BBCRouter);
ApiApp.use('/mbook', routes.MBookRouter);
ApiApp.use('/medium', routes.MBookRouter);
ApiApp.use('/mbookr', routes.MBookRRouter);
ApiApp.use('/cnn', routes.CNNRouter);
ApiApp.use('/reuters', routes.ReutersRouter);


module.exports=ApiApp;