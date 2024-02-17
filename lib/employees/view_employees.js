
const db_conn = require('../db_conn');


function main() {
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
    return db.promise().query(query_str);
}


module.exports = { main };
