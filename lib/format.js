
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


function main(choice,data){    
    let choice_v = choice.home_opt;
    if (choice_v == "View all departments") {
        return view_departments(data);
    }
    if (choice_v == "View all roles") {
        return view_roles(data);
    }
}


module.exports = { main };
