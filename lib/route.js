// route.js

const Departments = require('./Departments');
const view_employees = require('./view_employees');
const Roles = require('./Roles');
const add_department = require('./add_department');

function route(choice) {
    let choice_v = choice.home_opt;
    if (choice_v == "View all departments") {
        Departments.render_table();
    } else if (choice_v == "View all employees") {
        view_employees.main();
    } else if (choice_v == "View all roles") {
        Roles.render_table();
    } else if (choice_v == "Add a department") {
        add_department.main();
    }
}

module.exports = { route };
