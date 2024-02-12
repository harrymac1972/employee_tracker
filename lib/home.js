const chalk = require('chalk');
const inquirer = require('inquirer');
const home_route = require('./route');

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
        .then(async choice => {
            if (choice.home_opt !== "Quit") {
                home_route.route(choice);
                await delay(250);
                ask();
            } else {
                console.log(chalk.bold.red("\n\tSee you later Bucakaroo!"));
                process.exit(0);
            }
        })
        .catch(error => {
            console.log('Error:', error);
        });
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = { ask };
