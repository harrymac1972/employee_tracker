
const view_departments = require('./view_departments');
const view_employees = require('./view_employees');
const view_roles = require('./view_roles');
const add_department = require('./add_department');

function main(choice) {
    let choice_v = choice.home_opt;
    if (choice_v == "View all departments") {
        return view_departments.main();
    } else if (choice_v == "View all employees") {
        return view_employees.main();
    } else if (choice_v == "View all roles") {
        return view_roles.main();
    } else if (choice_v == "Add a department") {
        return add_department.main();
    } else {
        return [];
    }

}

module.exports = { main };
