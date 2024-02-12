const Departments = require('./Departments');

function route(choice) {
    let choice_v = choice.home_opt;
    console.log(`route: choice = ${choice_v}`)
    if (choice_v == "View all departments") {
        Departments.render_table();
    }
}





module.exports = { route };