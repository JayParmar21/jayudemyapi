const Cart = require('../schema/cartSchema');
const { db } = require('../config/database');
const Sequelize = require('sequelize');

exports.post = (body, done) => {
    Cart.create(body).then((newCart) => {
        if (newCart) {
            done(null, newCart);
        }
    }).catch((err) => {
        done(err);
    });
}

exports.getByUserId = (id, done) => {
    Cart.findOne({ where: { userId: id } }).then((getCart) => {
        if (getCart) {
            db.query("select carts.*,courses.coursename,courses.rupee,courses.courseImage,categories.name as categoryname,subcategories.name as subcategoryname from courses,categories,subcategories,carts where carts.isDelete = 0 && carts.isBought = 0 && courses.catId = categories.id && courses.subcatId = subcategories.id && carts.courseId = courses.id && carts.userId = " + id, { type: Sequelize.QueryTypes.SELECT })
                .then((cart) => {
                    done(null, cart)
                }).catch((err) => {
                    done(err)
                })
        }
        else {
            done({ message: "Id not found!!" })
        }
    })
}

exports.getByallUser = (done) => {
    Cart.findAll().then((getCart) => {
        if (getCart) {
            db.query("select users.id,users.fullname, users.email, GROUP_CONCAT(courses.coursename) as 'purchasedCourse', SUM(courses.rupee) as 'totalAmount' from courses,carts, users where carts.isDelete = 0 && carts.isBought = 1 && carts.courseId = courses.id && users.id = carts.userId GROUP BY users.id", { type: Sequelize.QueryTypes.SELECT })
                .then((cart) => {
                    done(null, cart)
                }).catch((err) => {
                    done(err)
                })
        }
        else {
            done({ message: "Id not found!!" })
        }
    })
}

exports.deleteById = (id, done) => {
    db.query("update carts set isDelete = 1 where id = " + id, { type: Sequelize.QueryTypes.UPDATE })
        .then((removeCart) => {
            done(null, removeCart)
        }).catch((err) => {
            done(err)
        })
}

exports.BuyCourse = (id, done) => {
    db.query("update carts set isBought = 1 where id = " + id, { type: Sequelize.QueryTypes.UPDATE })
        .then((removeCart) => {
            done(null, removeCart)
        }).catch((err) => {
            done(err)
        })
}

exports.getBoughtCourseByUserId = (id, done) => {
    Cart.findOne({ where: { userId: id } }).then((getCart) => {
        if (getCart) {
            db.query("select carts.*,chapters.courseId,chapters.files,courses.coursename,courses.rupee,courses.courseImage,courses.description,categories.name as categoryname,subcategories.name as subcategoryname,users.*,COUNT(chapters.courseId) as TotalChapter,GROUP_CONCAT(chapters.files) as lecture from courses,chapters,categories,subcategories,carts,users where carts.isDelete = 0 && carts.isBought = 1 && courses.catId = categories.id && courses.subcatId = subcategories.id && carts.courseId = courses.id && users.id=carts.userId && carts.userId = " + id + "&& chapters.courseId= courses.id GROUP BY chapters.courseId", { type: Sequelize.QueryTypes.SELECT })
                .then((cart) => {
                    done(null, cart)
                }).catch((err) => {
                    done(err)
                })
        }
        else {
            done({ message: "Id not found!!" })
        }
    })
}