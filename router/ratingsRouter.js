const { Router } = require('express');
const router = Router();

const { getRatingsByUserId, getAllData, updateCourseRatings, getRatingsByCourseId } = require('../controller/ratingsController');

router.post('/addRatings', (req, res, next) => {
    getAllData(req.body, (err, result) => {
        if (err) {
            res.statusCode = 400;
            res.json(err);
        }
        else {
            getRatingsByCourseId(req.body.courseId, (err, getRatingsresult) => {
                if (err) {
                    res.statusCode = 400;
                    res.json(err);
                }
                else {
                    updateCourseRatings(req.body.courseId, getRatingsresult[0].rate, (err, updateResult) => {
                        if (err) {
                            console.log(err);
                            res.statusCode = 400;
                            res.json(err);
                        }
                        else {
                            console.log(updateResult);
                            res.statusCode = 200;
                            res.json(updateResult);
                        }
                    })
                }
            })
        }
    })
});

router.get('/ratings/:userId', (req, res) => {
    const id = req.params.userId;
    getRatingsByUserId(id, (err, result) => {
        if (err) {
            res.statusCode = 400;
            res.json(err);
        }
        else {
            res.statusCode = 200;
            res.json(result);
        }
    })
});

module.exports = router;