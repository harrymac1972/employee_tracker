
// 'Departments' class

const db_conn = require('./DBConn');
const table = require('./Table');

function render_table() {
    let db = db_conn.get_DB_object();
    db.query('SELECT * FROM departments', (err, results_arr) => {
        if (err) {
            console.error('Error executing query:', err);
            return;
        }
        console.log('Results Array:', results_arr);
        console.log('Formatted:');
        console.log(table.format(results_arr));
    })
};


module.exports = { render_table };