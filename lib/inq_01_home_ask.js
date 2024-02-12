
const inquirer = require('inquirer');
const home_route = require('./inq_01_home_route');


function ask() {
    const questions = [
        {
            type: 'list',
            name: 'home_opt',
            message: "Choose 'Home Option':",
            choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Quit'
            ],
        },
    ];

    inquirer.prompt(questions)
        .then(choice => {
            console.log('Choice:', choice);
            if (choice.home_opt != "Quit") {
                home_route.route(choice);
            }
        })
        .catch(error => {
            console.log('Error:', error);
        });
}


module.exports = { ask };