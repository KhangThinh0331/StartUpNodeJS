const Product = require('../models/Product')
const { multipleMongooseToObject } = require('../../util/mongoose')
class TrashController {
    show(req, res, next) {
        let perPage = 3;
        let page = parseInt(req.query.page) || 1;
        const keyword = req.query.q

        let filter = {}
        if (keyword) {
            filter.name = { $regex: keyword, $options: 'i' }
        }
        Product.findDeleted(filter)
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .then((products) => {
                Product.countDocumentsDeleted(filter).then((count) => {
                    res.json({
                        products: multipleMongooseToObject(products),
                        current: page,
                        pages: Math.ceil(count / perPage),
                        query: keyword
                    });
                });
            })
            .catch(next)
    }
    restore(req, res, next) {
        Product.restore({ _id: req.params.id })
            .then(() => res.json({ message: "Khôi phục sản phẩm thành công" }))
            .catch(next)
    }
    forceDelete(req, res, next) {
        Product.deleteOne({ _id: req.params.id })
            .then(() => res.json({ message: "Xóa vĩnh viễn sản phẩm thành công" }))
            .catch(next)
    }
    bulkRestore(req, res, next) {
        const ids = req.body.ids
        Product.restore({ _id: { $in: ids } })
            .then(() => res.json({ message: "Khôi phục sản phẩm thành công" }))
            .catch(next)
    }
    bulkForceDelete(req, res, next) {
        const ids = req.body.ids
        Product.deleteMany({ _id: { $in: ids } })
            .then(() => res.json({ message: "Xóa vĩnh viễn sản phẩm thành công" }))
            .catch(next)
    }

    count(req, res, next) {
        Product.countDocumentsDeleted()
            .then(count => res.json({ count }))
            .catch(next);
    }
}

module.exports = new TrashController