const SubCategory = require('../schema/subCategorySchema');

exports.getById = (id, done) => {
    SubCategory.findOne({ where: { catId: id } }).then((getSubCat) => {
        if (getSubCat) {
            SubCategory.findAll({ where: { catId: id } }).then((cat) => {
                done(null, cat)
            }).catch((err) => {
                done(err)
            })
        }
        else {
            done({ message: "Id not found to update" })
        }
    })
}