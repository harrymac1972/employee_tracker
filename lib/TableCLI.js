
const Table = require('cli-table');

// Instantiate
const table = new Table({
    head: ['Header1', 'Header2', 'Header3'],
    colWidths: [15, 15, 15]
});

// Add rows
table.push(
    ['foo', 'bar', 'baz'],
    ['foo', 'bar', 'baz']
);

console.log(table.toString());
