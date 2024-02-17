
const inquirer = require('inquirer');
const db_conn = require('../db_conn');
const view_roles = require('../roles/view_roles');
const { get_role_id, get_roles_array } = require('../roles/role');
const { get_manager_id, get_managers_array } = require('../employees/employee');

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
