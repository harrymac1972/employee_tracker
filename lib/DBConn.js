

const mysql = require('mysql2');


function get_DB_object() {
    const db = mysql.createConnection(
        {
            host: 'localhost',
            user: 'root',
            password: 'password',
            database: 'tracker_db',
        }
    );
    return db;
}


module.exports = { get_DB_object };