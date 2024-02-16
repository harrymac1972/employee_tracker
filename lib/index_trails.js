
const view_departments = require('./view_departments');
const view_employees = require('./view_employees');
const view_roles = require('./view_roles');
const add_department = require('./add_department');
const add_role = require('./add_role');
const add_employee = require('./add_employee');

function main(choice) {
    let choice_str = choice.home_opt;
    if (choice_str == "View all departments") {
        return view_departments.main();
    } else if (choice_str == "View all employees") {
        return view_employees.main();
    } else if (choice_str == "View all roles") {
        return view_roles.main();
    } else if (choice_str == "Add a department") {
        return add_department.main();
    } else if (choice_str == "Add a role") {
        return add_role.main();
    } else if (choice_str == "Add an employee") {
        return add_employee.main();
    } else {
        return [];
    }

}

module.exports = { main };
