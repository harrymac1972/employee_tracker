
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

function main() {
    inquirer
    .prompt({
        type: 'input',
        name: 'dept_name',
        message: 'Department Name?:',
    })
    .then((user) => add_dept(user.dept_name))
}

main();

module.exports = { main };
