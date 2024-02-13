// route.js

const Departments = require('./Departments');
const Employees = require('./Employees');
const Roles = require('./Roles');

async function route(choice) {
    let choice_v = choice.home_opt;
    if (choice_v == "View all departments") {
        await Departments.render_table();
    } else if (choice_v == "View all employees") {
        await Employees.render_table();
    } else if (choice_v == "View all roles") {
        await Roles.render_table();
    } else if (choice_v == "Add a department") {
        await Departments.add_department();
    }
}

module.exports = { route };
