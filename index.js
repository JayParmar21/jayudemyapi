var express = require('express');
var cors = require('cors');
var path = require('path');

var app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());


var CourseImageDir = require('path').join(__dirname, '/CourseImages');
app.use(express.static(CourseImageDir));


var ThumbnailImageDir = require('path').join(__dirname, '/CourseImages/thumbnailImages');
app.use(express.static(ThumbnailImageDir));


var DocumentDir = require('path').join(__dirname, '/Documents');
app.use(express.static(DocumentDir));


//routers
const { db } = require('./config/database');
const userRoute = require('./router/userRouter');
const categoryRoute = require('./router/categoryRouter');
const subcategoryRoute = require('./router/subCategoryRouter')
const courseRoute = require('./router/courseRouter');
const chapterRoute = require('./router/chapterRouter');
const cartRoute = require('./router/cartRouter');
const ratingsRoute= require('./router/ratingsRouter')


// app.use('/images', express.static(ImageDir));
app.use('/courseImage', express.static(CourseImageDir));
app.use('/thumbnail', express.static(ThumbnailImageDir));
// app.use('/videos', express.static(VideoDir));
app.use('/document', express.static(DocumentDir));



//routes for routers
app.use('/user', userRoute);
app.use('/category', categoryRoute);
app.use('/subcategory', subcategoryRoute)
app.use('/course', courseRoute);
app.use('/chapter', chapterRoute);
app.use('/cart', cartRoute);
app.use('/rate',ratingsRoute);



db.authenticate().then(() => {
    console.log("Database connected");
}).catch(err => {
    console.log(err);
})

app.listen(3001, (err) => {
    if (err) {
        console.log('Error in connecting with port 3001');
    } else {
        console.log('Server has been set up on port 3001');
    }
});