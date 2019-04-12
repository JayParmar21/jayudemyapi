const Sequelize = require('sequelize');
const { db } = require('../config/database');

const User = db.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fullname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: {
        type: Sequelize.INTEGER,
        defaultValue: 2
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

User.sync({ force: false }).then((res) => {
    console.log('User Table Created');
}).catch((err) => {
    console.log('Error While Creating User Table');
})

module.exports = User;