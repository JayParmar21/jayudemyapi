const Sequelize = require('sequelize');
const { db } = require('../config/database');

const User = require('./userSchema');
const Course = require('./courseSchema');

const Cart = db.define('cart', {
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
    isDelete: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    isBought: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});

Cart.belongsTo(User, { foreignKey: 'userId' });
Cart.belongsTo(Course, { foreignKey: 'courseId' });

Cart.sync({ force: false }).then((res) => {
    console.log('Cart Table Created');
}).catch((err) => {
    console.log('Error While Creating Cart Table');
})

module.exports = Cart;