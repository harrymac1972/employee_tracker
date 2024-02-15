
const inquirer = require('inquirer');
const db_conn = require('./db_conn');
const view_departments = require('./view_departments');

function add_dept(dept_name) {
    let query_str = `INSERT INTO departments (name) VALUES (?)`;
    return new Promise((resolve, reject) => {
        try {
            const db = db_conn.get_DB_object();
            db.promise()
                .query(query_str, [dept_name])
                .then(() => resolve())
                .catch(error => reject(error));
        } catch (error) {
            reject(error);
        }
    });
}

async function main() {
    try {
        const userInput = await inquirer.prompt({
            type: 'input',
            name: 'dept_name',
            message: '\nDepartment Name?:',
        });
        
        await add_dept(userInput.dept_name);
        return view_departments.main();
    } catch (error) {
        console.error('Error:', error);
    }
}

module.exports = { main };
