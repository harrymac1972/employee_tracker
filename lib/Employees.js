// 'Employees' class

const db_conn = require('./DBConn');
const Table = require('cli-table');

function render_table() {
    let db = db_conn.get_DB_object();
    let query_str = `SELECT 
                        e.id AS id,
                        e.first_name AS first_name,
                        e.last_name AS last_name,
                        r.title AS title,
                        d.name AS department,
                        r.salary AS salary,
                        CONCAT(m.first_name, ' ', m.last_name) AS manager
                    FROM 
                        employees e
                    LEFT JOIN 
                        roles r ON e.role_id = r.id
                    LEFT JOIN 
                        departments d ON r.department_id = d.id
                    LEFT JOIN 
                        employees m ON e.manager_id = m.id;
                    `;
    db.query(query_str, (err, results_arr) => {
        if (err) {
            console.error('Error executing query:', err);
            return;
        }
        const table = new Table({
            head: ['ID',
                    'First Name',
                    'Last Name',
                    'Title',
                    'Department',
                    'Salary',
                    'Manager'],
            colWidths: [8,16,16,24,20,16,16]
        });
        for (obj of results_arr) {
            table.push([
                obj["id"],
                obj["first_name"],
                obj["last_name"],
                obj["title"],
                obj["department"],
                obj["salary"],
                "manager"
            ]);
        }
        console.log(table.toString());
        console.log(results_arr);
        // console.log(table.format(results_arr));
    });
}

module.exports = { render_table };
