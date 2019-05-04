const { Router } = require('express');
const router = Router();

const { post, getByUserId, deleteById, BuyCourse, getBoughtCourseByUserId, getByallUser } = require('../controller/cartController');

router.post('/addToCart', (req, res, next) => {
    post(req.body, (err, result) => {
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

router.get('/getByUser/:userId', (req, res) => {
    const id = req.params.userId;
    getByUserId(id, (err, result) => {
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

router.get('/getBuyallUser', (req, res) => {
    getByallUser((err, result) => {
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


router.delete('/remove/FromCart/:cartId', (req, res) => {
    const id = req.params.cartId;
    deleteById(id, (err, result) => {
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

router.put('/buycourse/:cartId', (req, res) => {
    const id = req.params.cartId;
    BuyCourse(id, (err, result) => {
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

router.get('/boughtCourse/user/:userId', (req, res) => {
    const id = req.params.userId;
    getBoughtCourseByUserId(id, (err, result) => {
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