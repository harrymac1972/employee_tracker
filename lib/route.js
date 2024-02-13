
const view_departments = require('./view_departments');
const view_employees = require('./view_employees');
const view_roles = require('./view_roles');
const add_department = require('./add_department');

function route(choice) {
    let choice_v = choice.home_opt;
    if (choice_v == "View all departments") {
        view_departments.main();
    } else if (choice_v == "View all employees") {
        view_employees.main();
    } else if (choice_v == "View all roles") {
        view_roles.main();
    } else if (choice_v == "Add a department") {
        add_department.main();
    }
}

module.exports = { route };
