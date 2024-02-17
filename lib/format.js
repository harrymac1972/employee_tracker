
const Table = require('cli-table');
const db_conn = require('./db_conn');


function view_departments(results_arr) {
    const table = new Table({
        head: ['ID',
                'Name'],
        colWidths: [8,24]
    });
    // 'cli-table' library expects one array push at a time
    for (obj of results_arr) {
        table.push([
            obj["id"],
            obj["name"]
        ]);
    }
    return table.toString();
}

async function view_employees(results_arr) {
    
        function get_manager(manager_str){
            if (manager_str == null) {
                return "-";
            } else {
                return manager_str;
            }
        }

    const table = new Table({
        head: ['ID',
                'First Name',
                'Last Name',
                'Title',
                'Department',
                'Salary',
                'Manager'],
        colWidths: [8,16,20,24,20,12,24]
    });
    for (obj of results_arr) {        
        table.push([
            obj["id"],
            obj["first_name"],
            obj["last_name"],
            obj["title"],
            obj["department"],
            obj["salary"],
            get_manager(obj["manager"])
        ]);
    }
    return table.toString();
}

async function view_roles(results_arr) {

    async function get_department(id) {
        let db = db_conn.get_DB_object();
        let query_str = `SELECT name FROM departments WHERE id=${id}`;
        let rslt_arr =  await db.promise().query(query_str);
        let dept_str = rslt_arr[0][0]["name"];
        return dept_str;
    }

    const table = new Table({
        head: ['ID',
                'Title',
                'Department',
                'Salary'],
        colWidths: [8,24,20,12]
    });
    for (obj of results_arr) {
        let department = await get_department(obj["department_id"]);
        table.push([
            obj["id"],
            obj["title"],
            department,
            obj["salary"],
        ]);
    }
    return table.toString();
}

async function main(choice,data){    
    let choice_str = choice.home_opt;
    if (choice_str == "View all departments") {
        return view_departments(data);
    }
    if (choice_str == "View all roles") {
        return view_roles(data);
    }
    if (choice_str == "View all employees") {
        return view_employees(data);
    }
    if (choice_str == "Add a department") {
        let db = db_conn.get_DB_object();
        let query_str = 'SELECT * FROM departments ';
        query_str += 'WHERE id = (SELECT MAX(id) FROM departments)';
        let rslt_arr =  await db.promise().query(query_str);
        let dept_name = rslt_arr[0][0]["name"];
        let rtn_str = "\n" + dept_name + " has been added to"
        rtn_str += " 'Departments' in database";
        return rtn_str;
    }
    if (choice_str == "Add a role") {
        let db = db_conn.get_DB_object();
        let query_str = 'SELECT * FROM roles ';
        query_str += 'WHERE id = (SELECT MAX(id) FROM roles)';
        let rslt_arr =  await db.promise().query(query_str);
        let role_name = rslt_arr[0][0]["title"];
        let rtn_str = "\n" + role_name + " has been added to"
        rtn_str += " 'Roles' in database";
        return rtn_str;
    }
    if (choice_str == "Add an employee") {
        let db = db_conn.get_DB_object();
        let query_str = 'SELECT * FROM employees ';
        query_str += 'WHERE id = (SELECT MAX(id) FROM employees)';
        let rslt_arr =  await db.promise().query(query_str);
        let first_name = rslt_arr[0][0]["first_name"];
        let last_name = rslt_arr[0][0]["last_name"];
        let rtn_str = "\n" + first_name + " " + last_name;
        rtn_str += " has been added to 'employees' in database";
        return rtn_str;
    }
    if (choice_str == "Update an employee role") {
        let rtn_str = "Updaterrrrrrrrr";
        return rtn_str;
    }
}


module.exports = { main };
