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
        const formData = req.body

        if (req.file) {
            formData.image = '/img/' + req.file.filename
        }
        const product = new Product(formData)
        product
            .save()
            .then(() => res.redirect('/products/list'))
            .catch(next)
    }
    edit(req, res, next) {
        Product.findById(req.params.id)
            .then(product => {
                res.render('products/update', { product: mongooseToObject(product) })
            })
            .catch(next)
    }
    update(req, res, next) {
        const data = req.body

        if (req.file) {
            data.image = '/img/' + req.file.filename
        } else {
            data.image = req.body.oldImage
        }

        Product.updateOne({ _id: req.params.id }, data)
            .then(() => res.redirect('/products/list'))
            .catch(next)
    }
    delete(req, res, next) {
        Product.delete({ _id: req.params.id })
            .then(() => res.redirect('/products/list'))
            .catch(next)
    }
}

module.exports = new ProductController