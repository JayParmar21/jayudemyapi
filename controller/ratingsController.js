const Ratings = require('../schema/ratingsSchema');
const { db } = require('../config/database');
const Sequelize = require('sequelize');

exports.getAllData = (body, done) => {
    Ratings.findAll({ where: { courseId: body.courseId, userId: body.userId } })
        .then((gotData) => {
            if (gotData.length > 0) {
                db.query("update ratings set ratings = " + body.ratings + " where courseId = " + body.courseId + " && userId = " + body.userId, { type: Sequelize.QueryTypes.UPDATE })
                    .then((data) => {
                        done(null, data);
                    }).catch((err) => {
                        done(err)
                    })
            }
            else {
                Ratings.create(body).then((newRating) => {
                    if (newRating) {
                        done(null, newRating);
                    }
                }).catch((err) => {
                    done(err);
                });
            }
        }).catch((err) => {
            done(err)
        })
}

exports.getRatingsByUserId = (id, done) => {
    Ratings.findAll({ where: { userId: id } }).then((getRatings) => {
        if (getRatings) {
            done(null, getRatings)
        }
    }).catch((err) => {
        done(err)
    })
}

exports.getRatingsByCourseId = (id, done) => {
    db.query("select avg(ratings) as rate from ratings where courseId = " + id, { type: Sequelize.QueryTypes.SELECT })
        .then((getRatings) => {
            if (getRatings) {
                done(null, getRatings)
            }
        }).catch((err) => {
            done(err)
        })
}

exports.updateCourseRatings = (id, data, done) => {
    db.query("update courses set ratings = " + data + " where id = " + id, { type: Sequelize.QueryTypes.UPDATE })
        .then((updateCourseRates) => {
            if (updateCourseRates) {
                done(null, updateCourseRates)
            }
        }).catch((err) => {
            done(err)
        })
}