const md5 =require('md5');

const router = require('express').Router();
const executeQuery= require('../utils/DataQuery').executeQuery;
module.exports=(req,res,next)=>{
    let name=req.body.name;
    let password=req.body.password;
    let gender=req.body.gender;

    executeQuery('credentials',`select name,password from passwords where name="${name}"`,(error,results,fields)=>{
        if(error){
            return res.status(500).end();
        }
        else if(results.length!=0){
            return res.status(400).json({
                msg:"User already exists",
            });
        }
        else {
            let sql =  `insert into passwords (name,password,gender)values("${name}","${md5(password)}","${gender}")`;
            executeQuery("credentials",sql,(err,results,fields)=>{
                if(err){
                    return res.status(500).end();
                }
                else{
                    return res.status(200).json({
                        msg:"SignUp OK",
                        id:results.insertId,
                    });
                }
            })
        }
    })
};
