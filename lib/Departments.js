// this file effectively becomes the 'Departments' class
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

function render_table() {
    let db = get_DB_object();
    db.query('SELECT * FROM departments', (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return;
        }
        console.log('Results:', results);
    })
};


module.exports = { render_table };