const Sequelize = require('sequelize');
const { db } = require('../config/database');

const Category = require('./categorySchema');

const SubCategory = db.define('subCategory', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    catId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

SubCategory.belongsTo(Category, { foreignKey: 'catId' });

SubCategory.sync({ force: false }).then((res) => {
    console.log('SubCategory Table Created');
}).catch((err) => {
    console.log('Error While Creating SubCategory Table');
})

module.exports = SubCategory;