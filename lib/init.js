// intital questions
const inquirer = require('inquirer');

const questions = [
    {
        type: 'input',
        name: 'name',
        message: "What's your name?",
    },
    {
        type: 'list',
        name: 'color',
        message: 'Pick a color:',
        choices: ['Red', 'Blue', 'Green', 'Yellow'],
    },
    {
        type: 'confirm',
        name: 'confirm',
        message: 'Are you sure?',
        default: true,
    }
];

inquirer.prompt(questions)
    .then(answers => {
        console.log('Answers:', answers);
    })
    .catch(error => {
        console.log('Error:', error);
    });
