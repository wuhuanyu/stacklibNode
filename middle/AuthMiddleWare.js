import { Buffer } from 'buffer';
const mysql = require('mysql');
const md5 = require('md5');

const basicAuth=require('express-basic-auth');
const executeQuery = require('../utils/DataQuery').executeQuery;
module.exports = function (req, res, next) {
    let auth = req.get('authorization');
    if (!auth) {
        res.set("WWW-Authenticate", "Basic realm=\"Authorization Required\"");
        return res.status(401).send("Authorization required");
    }

    let credentials = new Buffer(auth.split(" ").pop(), "base64").toString("ascii").split(":");
    /**
     * uNC,username provided,pC,password provided;
     */
    let uNC = credentials[0];
    let pC = md5(credentials[1]);
    let sql = `select password,id from passwords where name="${uNC}"`;
    executeQuery("credentials", sql, (err, results, fields) => {
        console.log(results[0].password);
        if(results.length===0){
            return res.status(400).json({
                msg:"No such user"
            })
        }
        else if(results[0].password===pC){
            /**
             * store username,passord,id
             */
            req.app.locals.username=credentials[0];
            req.app.locals.password=results[0].password;
            req.app.locals.id=results[0].id;
            /**
             * social 
             */
            next();
        }
        else if(results[0].password!=pC){
            return res.status(400).json({
                msg:"Password Wrong"
            })
        }
    });
}