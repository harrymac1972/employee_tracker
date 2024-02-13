const inquirer = require('inquirer');
const db_conn = require('./DBConn');
const table = require('./Table');

async function add_department() {
    try {
        await delay(500);
        let department_name = await inquirer.prompt([
            {
                type: 'input',
                name: 'department_name',
                message: 'What is the name of the department?'
            }
        ]);
        await db_add_department(department_name);
        console.log('Department added successfully.');
        render_table();
    } catch (error) {
        console.error('Error:', error);
    }
}

async function db_add_department(department_name) {
    const db = db_conn.get_DB_object();
    await db.query('INSERT INTO departments (name) VALUES (?)', [department_name]);
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function render_table() {
    let db = db_conn.get_DB_object();
    db.query('SELECT * FROM departments', (err, results_arr) => {
        if (err) {
            console.error('Error executing query:', err);
            return;
        }
        console.log(table.format(results_arr));
    });
}

module.exports = { add_department, render_table };
