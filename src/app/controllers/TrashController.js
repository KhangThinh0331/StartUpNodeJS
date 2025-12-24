const Product = require('../models/Product')
const { multipleMongooseToObject } = require('../../util/mongoose')
class TrashController {
    show(req, res, next) {
        Product.findDeleted({})
            .then(products => {
                res.render('trashes', { products: multipleMongooseToObject(products) })
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
}

module.exports = new TrashController