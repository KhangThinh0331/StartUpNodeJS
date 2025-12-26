const Product = require('../models/Product')
const { multipleMongooseToObject } = require('../../util/mongoose')
class SiteController {
    async index(req, res, next) {
        try {
            let perPage = 3;
            let page = parseInt(req.params.page) || 1;
            const keyword = req.query.q

            let filter = {}
            if (keyword) {
                filter.name = { $regex: keyword, $options: 'i' }
            }
            const products = await Product.find(filter).skip((perPage * page) - perPage).limit(perPage)
            const count = await Product.countDocuments(filter)
            res.render('home', { products: multipleMongooseToObject(products), current: page, pages: Math.ceil(count / perPage), query: keyword })
        } catch (error) {
            next(error)
        }
    }
    search(req, res) {
        res.render('news')
    }
}

module.exports = new SiteController