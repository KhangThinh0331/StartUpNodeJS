const Product = require('../models/Product')
const { multipleMongooseToObject } = require('../../util/mongoose')
const { mongooseToObject } = require('../../util/mongoose')
class ProductController {
    list(req, res, next) {
        Product.find({})
            .then(products => {
                res.render('products/list', { products: multipleMongooseToObject(products) })
            })
            .catch(next)
    }
    show(req, res, next) {
        Product.findOne({ slug: req.params.slug })
            .then(product => {
                res.render('products/show', { product: mongooseToObject(product) })
            })
            .catch(next)
    }
    create(req, res, next) {
        res.render('products/create')
    }
    store(req, res, next) {
        const product = new Product(req.body)
        product.save()
            .then(() => res.redirect('/'))
            .catch(next)
    }
}

module.exports = new ProductController