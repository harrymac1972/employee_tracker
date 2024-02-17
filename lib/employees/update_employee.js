
const inquirer = require('inquirer');
const { get_role_id, get_roles_array } = require('../roles/role');
const { get_employees_array } = require('../employees/employee');



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
        await update_employee(userInput.first_name,userInput.last_name,
                            role_id,employee_id);
        return await view_roles.main();
    } catch (error) {
        console.error('Error:', error);
    }
}


module.exports = { main };












module.exports = { main };