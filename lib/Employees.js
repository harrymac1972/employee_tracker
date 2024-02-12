
// 'Employees' class

const db_conn = require('./DBConn');
const table = require('./Table');

function render_table() {
    let db = db_conn.get_DB_object();
    db.query('SELECT * FROM employees', (err, results_arr) => {
        if (err) {
            console.error('Error executing query:', err);
            return;
        }
        console.log(table.format(results_arr));
    })
};


module.exports = { render_table };