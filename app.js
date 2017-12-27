
const app = require('express')();
const ApiApp=require('./ApiApp');
const AccountApp=require('./AccountApp');
const bodyParser =require('body-parser');
app.use(bodyParser());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.use('/api/v1',ApiApp);
app.use('/account',AccountApp);
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
