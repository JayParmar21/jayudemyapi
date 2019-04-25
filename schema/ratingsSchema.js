const Sequelize = require('sequelize');
const { db } = require('../config/database');

const User = require('./userSchema');
const Course = require('./courseSchema');

const Ratings = db.define('ratings', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    courseId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    ratings: {
        type: Sequelize.FLOAT,
        defaultValue: 0
    }
});

Ratings.belongsTo(User, { foreignKey: 'userId' });
Ratings.belongsTo(Course, { foreignKey: 'courseId' });

Ratings.sync({ force: false }).then((res) => {
    console.log('Ratings Table Created');
}).catch((err) => {
    console.log('Error While Creating Ratings Table');
})

module.exports = Ratings;