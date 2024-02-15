
const db_conn = require('./db_conn');

function main() {
    let db = db_conn.get_DB_object();
    return db.promise().query('SELECT * FROM departments');
}

module.exports = { main };
