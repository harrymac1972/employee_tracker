const grid = require('./grid');

async function fetchData() {
    try {
        let departments = await grid.main("departments");
        let employees = await grid.main("employees");
        let roles = await grid.main("roles");

        console.log(departments);
        console.log(employees);
        console.log(roles);
    } catch (error) {
        console.error('Error:', error);
    }
}

fetchData();

module.exports = { fetchData };
