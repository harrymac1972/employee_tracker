
const db_conn = require('./DBConn');
const inquirer = require('inquirer');

function add_dept(dept_name){
    let query_str = `INSERT INTO departments (name) VALUES ('${dept_name}')`
    try {
        const db = db_conn.get_DB_object();
        db.query(query_str,[dept_name]);
    } catch (error) {
        throw new Error('Error adding department to the database:', error);
    }
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    await delay(250);
    inquirer
    .prompt({
        type: 'input',
        name: 'dept_name',
        message: '\nDepartment Name?:',
    })
    .then((user) => add_dept(user.dept_name))
}

// main();

module.exports = { main };
