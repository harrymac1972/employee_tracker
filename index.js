
const clear = require('clear');
const chalk = require('chalk');
const home = require('./lib/home');

clear();
console.log(chalk.bold.green("\n\n\tEMPLOYEE TRACKER\n"));
home.ask();