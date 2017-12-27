const mysql = require('mysql');
function mysqlPool(dbname) {
   return mysql.createPool({
        'connectionLimit': 10,
        'host': 'localhost',
        'user': 'root',
        'password': 'why90951213',
        'database': dbname,
    });
}

module.exports=mysqlPool;