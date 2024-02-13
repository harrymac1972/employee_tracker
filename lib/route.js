
// route

const Departments = require('./Departments');
const Employees = require('./Employees');
const Roles = require('./Roles');



function route(choice) {
    let choice_v = choice.home_opt;
    if (choice_v == "View all departments") {
        Departments.render_table();
    }
    else if (choice_v == "View all employees") {
        Employees.render_table();
    }
    else if (choice_v == "View all roles") {
        Roles.render_table();
    }
    else if (choice_v == "Add a department") {
        Departments.add_department();
    }
}




module.exports = { route };