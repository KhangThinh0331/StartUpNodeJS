const Product = require('../models/Product')
const { multipleMongooseToObject } = require('../../util/mongoose')
class SiteController {
    async index(req, res, next) {
        try {
            const products = await Product.find({})
            res.render('home', { products: multipleMongooseToObject(products) })
        } catch (error) {
            next(error)
        }
    }
    search(req, res) {
        res.render('news')
    }
}

module.exports = new SiteController