
const db_conn = require('../db_conn');


async function get_role_id(roles_arr, role_str) {
    try {
        const db = db_conn.get_DB_object();       
        const query_str = "SELECT * FROM roles WHERE title = ?";
        const [rows, fields] = await db.promise().query(query_str, [role_str]);
        let id_n = rows[0]["id"];
        return id_n;
    } catch (error) {
        throw error;
    }
}

async function get_roles_array() {
    let query_str = "SELECT * FROM roles";
    try {
        const db = db_conn.get_DB_object();
        let data_qu = await db.promise().query(query_str);
        let objects = data_qu[0];
        let roles_arr = [];
        for (obj of objects) {
            roles_arr.push(obj["title"]);
        }
        return roles_arr;
    } catch (error) {
        throw error;
    }
}


module.exports = { get_role_id, get_roles_array }