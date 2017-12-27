const SocialApp=require('express')();
const auth = require('./middle/AuthMiddleWare');
const commentRouter=require("./routes/Comments");
SocialApp.use(auth);
/**
 * with username,password,id in app.locals
 */


SocailApp.use("/comment",commentRouter);

