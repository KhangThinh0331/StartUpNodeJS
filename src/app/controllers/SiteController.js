const Product = require('../models/Product')
const { multipleMongooseToObject } = require('../../util/mongoose')
class SiteController {
    async index(req, res, next) {
        try {
            let perPage = 3;
            let page = parseInt(req.query.page) || 1;
            const keyword = req.query.q

            let filter = {}
            if (keyword) {
                filter.name = { $regex: keyword, $options: 'i' }
            }
            const products = await Product.find(filter).skip((perPage * page) - perPage).limit(perPage)
            const count = await Product.countDocuments(filter)
            res.json({ products: multipleMongooseToObject(products), current: page, pages: Math.ceil(count / perPage), query: keyword })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new SiteController