const clear = require('clear');
const chalk = require('chalk');
const inquirer = require('inquirer');
const route = require('./route');

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms)); 
}   

async function ask() {
    let choice = null;

    while (choice !== "Quit") {
        choice = (await inquirer.prompt([
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
        ])).home_opt;

        if (choice !== "Quit") {
            const [data] = await route.route({ home_opt: choice });
            console.log(data);
            // await delay(1000);
        }
    }

    console.log(chalk.bold.red("\n\n\tSee you later Bucakaroo!\n"));
}

module.exports = { ask };
