const AccountApp = require('express')();
const executeQuery=require('./utils/DataQuery').executeQuery;
import * as routes from './routes/index';

AccountApp.use('/signup',routes.SignUpRouter);

module.exports=AccountApp;