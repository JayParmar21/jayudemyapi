const { Router } = require('express');
const router = Router();

const { getById } = require('../controller/subCategoryController');

router.get('/:id', (req, res) => {
    const id = req.params.id;
    getById(id, (err, result) => {
        if (err) {
            res.statusCode = 400;
            res.json(err);
        }
        else {
            res.statusCode = 200;
            res.json(result);
        }
    })
})

module.exports = router;