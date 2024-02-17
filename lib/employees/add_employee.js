
const inquirer = require('inquirer');
const db_conn = require('../db_conn');
const view_roles = require('../roles/view_roles');
const { get_role_id, get_roles_array } = require('../roles/role');

async function add_employee(first_name,last_name,role_id,manager_id) {
    try {
        const db = db_conn.get_DB_object();
        let query_str = `INSERT INTO employees (first_name,last_name,`
        query_str += `role_id,manager_id) VALUES (?,?,?,?)`;
        await db.promise().query(query_str,[first_name,last_name,
                                            role_id,manager_id]);
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

async function main() {
    try {
        var managers_arr = await get_managers_array();
        var roles_arr = await get_roles_array();
        const userInput = await inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'First Name?:',
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Last Name?:',
            },
            {
                type: 'list',
                name: 'role',
                message: 'Role?:',
                choices: roles_arr,
            },
            {
                type: 'list',
                name: 'manager',
                message: 'Manager?:',
                choices: managers_arr,
            },
        ]);
        let role_id = await get_role_id(roles_arr,userInput.role);
        let manager_id = await get_manager_id(userInput.manager);
        await add_employee(userInput.first_name,userInput.last_name,
                            role_id,manager_id);
        return await view_roles.main();
    } catch (error) {
        console.error('Error:', error);
    }
}


module.exports = { main };
