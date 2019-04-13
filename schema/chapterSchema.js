const Sequelize = require('sequelize');
const {db} = require('../config/database');

const Course =require('../schema/courseSchema')

const Chapter = db.define('chapter',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    chapterName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    courseId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    isDelete: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    files: {
        type: Sequelize.STRING
    }
});

Chapter.belongsTo(Course,{foreignKey:'courseId'});

Chapter.sync({ force: false }).then((res) => {
    console.log('Chapter Table Created');
}).catch((err) => {
    console.log('Error While Creating Chapter Table');
})

module.exports = Chapter;