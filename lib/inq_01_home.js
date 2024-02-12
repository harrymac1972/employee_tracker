
const inquirer = require('inquirer');

var choice = {};

function main() {
    const questions = [
        {
            type: 'list',
            name: 'home',
            message: "Choose 'Home Option':",
            choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            ],
        },
    ];

    inquirer.prompt(questions)
        .then(choice => {
            console.log('Choice:', choice);
        })
        .catch(error => {
            console.log('Error:', error);
        });
}

module.exports = { main,choice };