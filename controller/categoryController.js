const Category = require('../schema/categorySchema');

exports.getAll = (done) => {
    Category.findAll().then((getcategory) => {
        if (getcategory) {
            done(null, getcategory);
        }

    }).catch((err) => {
        done(err);
    });
}