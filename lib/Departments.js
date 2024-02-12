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
    let tbl_row_arr = [];
    let tbl_matrix_arr = [];
    console.log("\n\tdepartment table incoming...\n");
    db = get_DB_object();




}




module.exports = { render_table };