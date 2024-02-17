
const db_conn = require('../db_conn');


async function get_employees_array() {
    let query_str = "SELECT * FROM employees";
    try {
        const db = db_conn.get_DB_object();
        const data_qu = await db.promise().query(query_str);
        let objects = data_qu[0];
        let employees_arr = [];
        for (obj of objects) {
            let full_name = obj["first_name"] + " " + obj["last_name"];
            employees_arr.push(full_name);
        }
        return employees_arr;
    } catch (error) {
        throw error;
    }
}

async function get_employee_full_name(id) {
    try {
        const db = db_conn.get_DB_object();       
        let query_str = "SELECT * FROM employees WHERE id = ?";
        const rslt_arr = await db.promise().query(query_str,[id]);
        let full_name = rslt_arr[0][0]["first_name"];
        full_name += " ";
        full_name += rslt_arr[0][0]["last_name"];
        return full_name;
    } catch (error) {
        throw error;
    }
}

async function get_employee_id(employee_full_name) {
    try {
        const db = db_conn.get_DB_object();        
        const [first_name, last_name] = employee_full_name.split(' ');        
        let query_str = "SELECT * FROM employees WHERE first_name = ?";
        query_str += " AND last_name = ?"
        const [rows, fields] = await db.promise().query(query_str,
                                                [first_name, last_name]);
        let id_n = rows[0]["id"];
        return id_n;
    } catch (error) {
        throw error;
    }
}

async function get_manager_id(manager_full_name) {
    try {
        if (manager_full_name == "NONE") {
            return null;
        }
        const db = db_conn.get_DB_object();        
        const [first_name, last_name] = manager_full_name.split(' ');        
        let query_str = "SELECT * FROM employees WHERE first_name = ?";
        query_str += " AND last_name = ?"
        const [rows, fields] = await db.promise().query(query_str,
                                                [first_name, last_name]);
        let id_n = rows[0]["id"];
        return id_n;
    } catch (error) {
        throw error;
    }
}

async function get_managers_array() {
    // if they don't have a manager = they ARE a manager
    // (regardless of role title)
    // executive decision made by ... me!
    // NOTE: Future Development:  this could be fine tuned to
    // include only those with role titles that contain
    // 'Lead' or 'Manager'.
    // Warmest Regards,
    // Harry
    let query_str = "SELECT * FROM employees WHERE manager_id IS NULL";
    try {
        const db = db_conn.get_DB_object();
        const data_qu = await db.promise().query(query_str);
        let objects = data_qu[0];
        let managers_arr = ["NONE"];
        for (obj of objects) {
            let full_name = obj["first_name"] + " " + obj["last_name"];
            managers_arr.push(full_name);
        }
        return managers_arr;
    } catch (error) {
        throw error;
    }
}


module.exports = { get_employee_id,
                    get_employee_full_name,
                    get_employees_array, 
                    get_manager_id, 
                    get_managers_array }