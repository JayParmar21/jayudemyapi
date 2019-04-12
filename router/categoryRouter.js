const { Router } = require('express');
const router = Router();

const { getAll } = require('../controller/categoryController');

router.get('/getCategory', (req, res) => {
    getAll((err, result) => {
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