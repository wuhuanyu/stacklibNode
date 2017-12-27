module.exports.executeQuery=function(dbname,query,cbk){
const mysqlPool=require('./ConnecitonPool')(dbname);
if(mysqlPool){
    mysqlPool.getConnection((err,con)=>{
        if(err){
            con.release();
            console.log(err);
            throw err;
        }
        con.query(query,(err,r,fields)=>{
            con.release();
            console.log(err);
            if(!err){
                cbk(null,r,fields);
            }
        });
        con.on('error',(err)=>{
            throw err;
            console.log(err);
            return;
        })
    })
}
}