
const db_conn = require('./db_conn');
const table = require('./Table');


var db = db_conn.get_DB_object();

async function replace_role_id_with_string(results_arr) {
    var new_arr = [];
    for (var i = 0; i < results_arr.length; i++) {
        let row_o = results_arr[i];
        let dept_id = row_o["department_id"];
        try {
            const dept_arr = await new Promise((resolve, reject) => {
                db.query(`SELECT name FROM departments WHERE id=${dept_id}`, (err, result) => {
                    if (err) {
                        console.error('Error executing query:', err);
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
            var dept_str = dept_arr[0]["name"];
            var new_row_o = row_o;
            new_row_o["department_id"] = dept_str;
            new_arr.push(new_row_o);
        } catch (err) {
            console.error('Error:', err);
        }
    }
    return new_arr;
}


function main() {
    let db = db_conn.get_DB_object();
    return db.promise().query('SELECT * FROM roles');
}


module.exports = { main };