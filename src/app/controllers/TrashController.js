const Product = require('../models/Product')
const { multipleMongooseToObject } = require('../../util/mongoose')
class TrashController {
    show(req, res, next) {
        const keyword = req.query.q

        let filter = {}
        if (keyword) {
            filter.name = { $regex: keyword, $options: 'i' }
        }
        Product.findDeleted(filter)
            .then(products => {
                res.render('trashes', { products: multipleMongooseToObject(products), query: keyword })
            })
            .catch(next)
    }
    restore(req, res, next) {
        Product.restore({ _id: req.params.id })
            .then(() => res.redirect('/trashes'))
            .catch(next)
    }
    forceDelete(req, res, next) {
        Product.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('/trashes'))
            .catch(next)
    }
    bulkRestore(req, res, next) {
        const ids = req.body.ids.split(',')
        Product.restore({ _id: { $in: ids } })
            .then(() => res.redirect('/trashes'))
            .catch(next)
    }
    bulkForceDelete(req, res, next) {
        const ids = req.body.ids.split(',')
        Product.deleteMany({ _id: { $in: ids } })
            .then(() => res.redirect('/trashes'))
            .catch(next)
    }
}

module.exports = new TrashController