
const inquirer = require('inquirer');
const db_conn = require('./db_conn');
const view_roles = require('./view_roles');

async function add_role(title,department_id,salary) {
    try {
        const db = await db_conn.get_DB_object();
        const query_str = `INSERT INTO roles (title, department_id, salary) VALUES (?, ?, ?)`;
        await db.promise().query(query_str,[title,department_id,salary]);
    } catch (error) {
        throw error;
    }
}

function get_department_id(departments_arr,department_str) {
    for (obj of departments_arr) {
        if (obj["name"] == department_str) {
            return obj["id"];
        }
    }
}

async function get_departments_array() {
    let query_str = "SELECT * FROM departments";
    try {
        const db = await db_conn.get_DB_object();
        const [rows] = await db.promise().query(query_str);
        return rows;
    } catch (error) {
        throw error;
    }
}

async function main() {
    try {
        var departments_arr = await get_departments_array();
        console.log(departments_arr);

        const userInput = await inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Role Name?:',
            },
            {
                type: 'list',
                name: 'department',
                message: 'Department?:',
                choices: departments_arr,
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Salary?:',
            },
        ]);
        let department_id = get_department_id(departments_arr,userInput.department);
        await add_role(userInput.title,department_id, userInput.salary);
        return await view_roles.main();
    } catch (error) {
        console.error('Error:', error);
    }
}


module.exports = { main };
