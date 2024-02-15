
const Table = require('cli-table');


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

function main(choice,data){    
    let choice_v = choice.home_opt;
    if (choice_v == "View all departments") {
        return view_departments(data);
    }
}


module.exports = { main };
