const Sequelize = require('sequelize');
const { db } = require('../config/database');

const Category = require('./categorySchema');
const SubCategory = require('./subCategorySchema');
const User = require('./userSchema');

const Course = db.define('course', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    coursename: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    rupee: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    catId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    subcatId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    isDelete: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    courseImage: {
        type: Sequelize.STRING
    },
    ratings: {
        type: Sequelize.FLOAT,
        defaultValue: 0
    }
});

Course.belongsTo(Category, { foreignKey: 'catId' });
Course.belongsTo(SubCategory, { foreignKey: 'subcatId' });
Course.belongsTo(User, { foreignKey: 'userId' });

Course.sync({ force: false }).then((res) => {
    console.log('Course Table Created');
}).catch((err) => {
    console.log('Error While Creating Course Table');
})

module.exports = Course;