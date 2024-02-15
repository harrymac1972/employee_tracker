
const db_conn = require('./db_conn');
const Table = require('cli-table');

function main() {
    let db = db_conn.get_DB_object();
    return db.promise().query('SELECT * FROM departments');
    // db.query('SELECT * FROM departments', (err, results_arr) => {
        // if (err) {
        //     console.error('Error executing query:', err);
        //     return;
        // }
        // const table = new Table({
        //     head: ['ID',
        //             'Name'],
        //     colWidths: [8,24]
        // });
        // // 'cli-table' library expects one array push at a time
        // for (obj of results_arr) {
        //     table.push([
        //         obj["id"],
        //         obj["name"]
        //     ]);
        // }
        // console.log(table.toString());
    // });
}

module.exports = { main };
