const { Router } = require('express');
const router = Router();

const path = require('path');
const multer = require('multer');

const { post, getByCourseId } = require('../controller/chapterController');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Documents')
    },
    filename: (req, file, cb) => {
        cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
    }
});

var upload = multer({ storage: storage }).array('files', 10);

router.post('/add/chapter', upload, (req, res, next) => {
    var documents = [];
    for (let file of req.files) {
        documents.push(file.filename);
    }
    req.body.files = JSON.stringify(documents);
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

router.get('/getChapter/:courseId', (req, res) => {
    const id = req.params.courseId;
    getByCourseId(id, (err, result) => {
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
