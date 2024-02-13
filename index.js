
const clear = require('clear');
const chalk = require('chalk');
const home = require('./lib/home');

clear();
console.log(chalk.bold.green("\n\n\tEMPLOYEE TRACKER\n"));
async function main() {
    while (true) {
        await home.ask();
    }
}

main();
