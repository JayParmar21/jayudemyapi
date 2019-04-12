const Sequalize = require('sequelize');
const Op = Sequalize.Op;

exports.db = new Sequalize('jpudemy', 'root', '', {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    operatorsAliases: Op,
});

if (exports.db) {
    console.log("Database connection done successfully!!!");
}