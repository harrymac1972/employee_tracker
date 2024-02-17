



async function main() {
    try {
        // var managers_arr = await get_managers_array();
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
        // let manager_id = await get_manager_id(userInput.manager);
        await update_employee(userInput.first_name,userInput.last_name,
                            role_id,manager_id);
        return await view_roles.main();
    } catch (error) {
        console.error('Error:', error);
    }
}















module.exports = { main };