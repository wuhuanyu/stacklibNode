const mysql = require('mysql');
function mysqlPool(dbname) {
    mysql.createPool({
        'connectionLimit': 10,
        'host': 'localhost',
        'user': 'root',
        'password': 'why90951213',
        'database': 'credentials',
    });
}

module.exports=mysqlPool;