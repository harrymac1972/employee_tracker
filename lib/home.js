const clear = require('clear');
const chalk = require('chalk');
const inquirer = require('inquirer');
const route = require('./route');


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms)); 
}   

async function ask() {
    while (true) {
        const choice = await inquirer.prompt([
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
        ]);

        if (choice.home_opt !== "Quit") {
            route.route(choice);
        } else {
            console.log(chalk.bold.red("\n\n\tSee you later Bucakaroo!\n"));
            break;
        }
        await delay(64);
    }
};

module.exports = { ask };