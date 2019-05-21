const Course = require('../schema/courseSchema');
const { db } = require('../config/database');
const Sequelize = require('sequelize');

exports.post = (body, done) => {
    Course.create(body).then((newCourse) => {
        if (newCourse) {
            done(null, newCourse);
        }
    }).catch((err) => {
        done(err);
    });
}


exports.getAll = (done) => {
    db.query("select courses.*,chapters.courseId,chapters.files,categories.name as categoryname,subcategories.name as subcategoryname, COUNT(chapters.courseId) as TotalChapter,GROUP_CONCAT(chapters.files) as lecture from courses,chapters,categories,subcategories  where courses.catId = categories.id && courses.subcatId = subcategories.id && courses.isDelete = 0 && chapters.courseId= courses.id GROUP BY chapters.courseId", { type: Sequelize.QueryTypes.SELECT })
        .then((getCourse) => {
            if (getCourse) {
                done(null, getCourse);
            }

        }).catch((err) => {
            done(err);
        });
}

exports.getByCatId = (id, done) => {
    Course.findOne({ where: { catId: id } }).then((getCourse) => {
        if (getCourse) {
            db.query("select courses.*,users.fullname,subcategories.name as subcategory,categories.name as category from courses,users,subcategories,categories where subcategories.id = courses.subcatId && categories.id = courses.catId " +
                "&&  courses.userID = users.id && courses.isDelete = 0 && categories.id = " + id + " && subcategories.catId = " + id + " && courses.catId = " + id, { type: Sequelize.QueryTypes.SELECT })
                .then((cat) => {
                    done(null, cat)
                }).catch((err) => {
                    done(err)
                })
        }
        else {
            done({ message: "Id not found!!" })
        }
    })
}

exports.getCourseById = (courseId, done) => {
    db.query("select courses.*,users.fullname,categories.name as categoryname,subcategories.name as subcategoryname from courses,users,categories,subcategories where  courses.userId=users.id && courses.isDelete = 0 && courses.catId = categories.id && courses.subcatId = subcategories.id && courses.id = " + courseId, { type: Sequelize.QueryTypes.SELECT })
        .then((getCourse) => {
            if (getCourse) {
                done(null, getCourse);
            }

        }).catch((err) => {
            done(err);
        });
}

exports.getByUserId = (id, done) => {
    Course.findOne({ where: { userId: id } }).then((getCourse) => {
        if (getCourse) {
            db.query("select courses.*,users.fullname,subcategories.name as subcategory,categories.name as category from courses,users,subcategories,categories where subcategories.id = courses.subcatId && categories.id = courses.catId " +
                "&& courses.userID = users.id && courses.isDelete = 0 && courses.userId = " + id, { type: Sequelize.QueryTypes.SELECT })
                .then((cat) => {
                    done(null, cat)
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
    db.query("update courses set isDelete = 1 where id = " + id, { type: Sequelize.QueryTypes.UPDATE })
        .then((removeCourse) => {
            done(null, removeCourse)
        }).catch((err) => {
            done(err)
        })
}

exports.updateById = (id, body, done) => {
    Course.update(body, { where: { id: id } }).then((updateCourse) => {
        if (updateCourse) {
            db.query("select courses.*,users.fullname,subcategories.name as subcategory,categories.name as category from courses,users,subcategories,categories where subcategories.id = courses.subcatId && categories.id = courses.catId " +
                "&& courses.userID = users.id && courses.isDelete = 0 && courses.userId = users.id && courses.id = " + id, { type: Sequelize.QueryTypes.SELECT })
                .then((cat) => {
                    done(null, cat)
                }).catch((err) => {
                    done(err)
                })
        }
    }).catch((err) => {
        done(err)
    })
}
