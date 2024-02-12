const db_conn = require('./DBConn');

async function get_grid(table_name) {
    let db = db_conn.get_DB_object();
    try {
        var grid = await new Promise((resolve, reject) => {
            db.query(`SELECT * FROM ${table_name}`, (err, result) => {
                if (err) {
                    console.error('Error executing query:', err);
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
        return grid;
    } catch (err) {
        console.error('Error:', err);
        throw err;
    }
}

async function main(table_name) {
    try {
        let dept_grid = await get_grid(table_name);
        return dept_grid;
    } catch (error) {
        console.error('Error:', error);
    }
}

(async () => {
    try {
        let result = await main("departments");
        console.log(result);
    } catch (error) {
        console.error('Error:', error);
    }
})();

module.exports = { main };
