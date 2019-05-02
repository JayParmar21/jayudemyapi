const { Router } = require('express');
const router = Router();
const path = require('path');

const multer = require('multer');
const Jimp = require('jimp');
const { post, getAll, getByCatId, getCourseById, getByUserId, deleteById, updateById } = require('../controller/courseController');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './CourseImages')
    },
    filename: (req, file, cb) => {
        cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
    }
});

var upload = multer({ storage: storage }).single('courseImage');

router.post('/add/course', upload, (req, res, next) => {
    if (req.file) {
        let imagePath = path.join(__dirname, '../CourseImages/' + req.file.filename);
        let thumbnailImagePath = path.join(__dirname, '../CourseImages/thumbnailImages/' + req.file.filename);
        Jimp.read(imagePath)
            .then(result => {
                return result
                    .resize(100, 100) // resize
                    .quality(100) // set JPEG quality
                    .write(thumbnailImagePath); // save
            })
            .catch(err => {
                console.error(err);
            });
        req.body.courseImage = req.file.filename;
    }
    else {
        req.body.courseImage = "defaultCourseImage.png"
    }
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

router.get('/getCourse/:courseId', (req, res) => {
    const id = req.params.courseId;
    getCourseById(id, (err, result) => {
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

router.get('/getCourse', (req, res) => {
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

router.get('/getByCategory/:catId', (req, res) => {
    const id = req.params.catId;
    getByCatId(id, (err, result) => {
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


router.delete('/remove/course/:courseId', (req, res) => {
    const id = req.params.courseId;
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

router.put('/update/:id', upload, (req, res) => {
    if (req.file) {
        let imagePath = path.join(__dirname, '../CourseImages/' + req.file.filename);
        let thumbnailImagePath = path.join(__dirname, '../CourseImages/thumbnailImages/' + req.file.filename);
        Jimp.read(imagePath)
            .then(result => {
                return result
                    .resize(100, 100) // resize
                    .quality(100) // set JPEG quality
                    .write(thumbnailImagePath); // save
            })
            .catch(err => {
                console.error(err);
            });
        req.body.courseImage = req.file.filename;
    }
    else if (req.body.courseImage == "defaultCourseImage.png") {
        req.body.courseImage = "defaultCourseImage.png"
    }
    updateById(req.params.id, req.body, (err, result) => {
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