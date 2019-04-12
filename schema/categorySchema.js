const Sequelize = require('sequelize');
const { db } = require('../config/database');

const Category = db.define('category', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Category.sync({ force: false }).then((res) => {
    console.log('Category Table Created');
}).catch((err) => {
    console.log('Error While Creating Category Table');
})

module.exports = Category;