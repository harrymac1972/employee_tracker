
// 'Departments' class

const db_conn = require('./DBConn');

function render_table() {
    let db = db_conn.get_DB_object();
    db.query('SELECT * FROM departments', (err, results_arr) => {
        if (err) {
            console.error('Error executing query:', err);
            return;
        }
        console.log('Results Array:', results_arr);
    })
};


module.exports = { render_table };