
const Departments = require('./Departments');


function route(choice) {
    let choice_v = choice.home_opt;
    if (choice_v == "View all departments") {
        Departments.render_table();
    }
}





module.exports = { route };