
const db_conn = require('../db_conn');
const inquirer = require('inquirer');
const { get_role_id, get_roles_array } = require('../roles/Role');
const view_roles = require('../roles/view_roles');
const { get_employee_id, get_employees_array} = require('./Employee');


async function update_employee_role(employee_id,role_id) {
    try {
        const db = db_conn.get_DB_object();
        let query_str = `UPDATE employees SET role_id = ? WHERE id = ?`;
        await db.promise().query(query_str, [role_id, employee_id]);
        return employee_id;
    } catch (error) {
        throw error;
    }
}

async function main() {
    try {
        var employees_arr = await get_employees_array();
        var roles_arr = await get_roles_array();
        const userInput = await inquirer.prompt([
            {
                type: 'list',
                name: 'employee',
                message: 'Employee to update?:',
                choices: employees_arr,
            },
            {
                type: 'list',
                name: 'role',
                message: 'Role to be assigned?:',
                choices: roles_arr,
            },
        ]);
        let role_id = await get_role_id(roles_arr,userInput.role);
        let employee_id = await get_employee_id(userInput.employee);
        await update_employee_role(employee_id,role_id);
        return [employee_id];
    } catch (error) {
        console.error('Error:', error);
    }
}


module.exports = { main };