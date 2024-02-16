
const inquirer = require('inquirer');
const db_conn = require('./db_conn');
const view_roles = require('./view_roles');

async function add_employee(first_name,last_name,role_id,manager_id) {
    try {
        const db = await db_conn.get_DB_object();
        const query_str = `INSERT INTO employees (first_name,last_name,`
        query_str += `role_id,manager_id) VALUES (?,?,?,?)`;
        await db.promise().query(query_str,[first_name,last_name,
                                            role_id,manager_id]);
    } catch (error) {
        throw error;
    }
}

async function get_managers_array() {
    let query_str = "SELECT * FROM employees";
    try {
        const db = await db_conn.get_DB_object();
        const data_qu = await db.promise().query(query_str);
        let objects = data_qu[0];
        let managers_arr = [];
        for (obj of objects) {
            managers_arr.push([obj["first_name"],obj["last_name"]]);
        }
        return managers_arr;
    } catch (error) {
        throw error;
    }
}

function get_manager_id(managers_arr,manager_ls) {
    console.log(managers_arr);
    console.log(manager_ls);
    process.exit();
    for (obj of managers_arr) {
        if (obj["first_name"] == manager_ls[0]) {
            if (obj["last_name"] == manager_ls[1]) {
                return obj["id"];
            }
        }
    }
}

async function get_roles_array() {
    let query_str = "SELECT * FROM roles";
    try {
        const db = await db_conn.get_DB_object();
        const data_qu = await db.promise().query(query_str);
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

function get_role_id(roles_arr,role_str) {
    for (obj of roles_arr) {
        if (obj["name"] == role_str) {
            return obj["id"];
        }
    }
}

async function main() {
    try {
        var managers_arr = await get_managers_array();
        console.log(managers_arr);
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
        let role_id = get_role_id(roles_arr,userInput.role);
        console.log(userInput.manager);
        let manager_id = get_manager_id(managers_arr,userInput.manager);
        await add_employee(userInput.first_name,userInput.last_name,
                            role_id,manager_id);
        return await view_roles.main();
    } catch (error) {
        console.error('Error:', error);
    }
}


module.exports = { main };
