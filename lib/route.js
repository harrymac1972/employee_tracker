// route.js

const Departments = require('./Departments');
const view_employees = require('./view_employees');
const Roles = require('./Roles');
const add_department = require('./add_department');

async function route(choice) {
    let choice_v = choice.home_opt;
    if (choice_v == "View all departments") {
        await Departments.render_table();
    } else if (choice_v == "View all employees") {
        await view_employees.main();
    } else if (choice_v == "View all roles") {
        await Roles.render_table();
    } else if (choice_v == "Add a department") {
        await add_department.main();
    }
}

module.exports = { route };
