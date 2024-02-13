
const db_conn = require('./DBConn');
const table = require('./Table');

function main() {
    let db = db_conn.get_DB_object();
    db.query('SELECT * FROM departments', (err, results_arr) => {
        if (err) {
            console.error('Error executing query:', err);
            return;
        }
        console.log(table.format(results_arr));
    });
}

module.exports = { main };
