const SocialApp=require('express')();
const auth = require('./middle/AuthMiddleWare');

SocialApp.use(auth);
/**
 * with username,password,id in app.locals
 */


SocailApp.()
