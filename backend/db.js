const mysql = require('mysql');
const pool  = mysql.createPool({
    host: 'database',
    user: 'root',
    password: 'password',
    connectionLimit: 10,
    database: 'my_app',
});

exports.pool = pool;
