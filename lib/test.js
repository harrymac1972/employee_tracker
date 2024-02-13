const grid = require('./grid');

async function fetchData() {
    try {
        let compo_arr = [];
        let departments = await grid.main("departments");
        let employees = await grid.main("employees");
        let roles = await grid.main("roles");

        compo_arr.push(departments);
        compo_arr.push(employees);
        compo_arr.push(roles);
        return compo_arr;
    } catch (error) {
        console.error('Error:', error);
    }
}

(async () => {
    try {
        let data_arr = await fetchData();
        console.log(data_arr);

    } catch (error) {
        console.error('Error:', error);
    }
})();

module.exports = { fetchData };
