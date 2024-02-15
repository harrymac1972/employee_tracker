
const clear = require('clear');
const chalk = require('chalk');
const index_home = require('./lib/index_home');


clear();
console.log(chalk.bold.green("\n\n\tEMPLOYEE TRACKER\n"));
async function main() {
    while (true) {
        await index_home.ask();
    }
}

main();
