module.exports.executeQuery=function(dbname,query,cbk){
const mysqlPool=require('./ConnecitonPool')(dbname);
if(mysqlPool){
    mysqlPool.getConnection((err,con)=>{
        if(err){
            con.release();
            throw err;
        }
        con.query(query,(err,r)=>{
            con.release();
            if(!err){
                cbk(null,{rows:r});
            }
        });
        con.on('error',(err)=>{
            throw err;
            return;
        })
    })
}
}