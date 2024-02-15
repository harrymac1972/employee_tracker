const clear = require('clear');
const chalk = require('chalk');
const inquirer = require('inquirer');
const index_trails = require('./index_trails');
const format = require('./format');


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
            const [data] = await index_trails.main({ home_opt: choice });
            console.log(await format.main({ home_opt: choice },data) + "\n\n");
        }
    }
    console.log(chalk.bold.red("\n\n\tSee you later Bucakaroo!\n\n"));
    process.exit();
}


module.exports = { ask };
