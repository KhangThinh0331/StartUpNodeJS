const Product = require('../models/Product')
const { mongooseToObject } = require('../../util/mongoose')
class ProductController {
    show(req, res, next) {
        Product.findOne({ slug: req.params.slug })
            .then(product => {
                res.json({ product: mongooseToObject(product) })
            })
            .catch(next)
    }
    store(req, res, next) {
        const formData = req.body

        if (req.file) {
            formData.image = req.file.path
        }
        const product = new Product(formData)
        product
            .save()
            .then(() => res.json({ message: 'Thêm sản phẩm thành công' }))
            .catch(next)
    }
    edit(req, res, next) {
        Product.findById(req.params.id)
            .then(product => {
                res.json({ product: mongooseToObject(product) })
            })
            .catch(next)
    }
    update(req, res, next) {
        const data = req.body

        if (req.file) {
            data.image = req.file.path
        } else {
            data.image = req.body.oldImage
        }

        Product.findByIdAndUpdate(req.params.id, data)
            .then(() => res.json({ message: 'Cập nhật thành công' }))
            .catch(next)
    }
    delete(req, res, next) {
        Product.delete({ _id: req.params.id })
            .then(() => res.json({ message: 'Xóa sản phẩm thành công' }))
            .catch(next)
    }
    bulkDelete(req, res, next) {
        const ids = req.body.ids

        Product.delete({ _id: { $in: ids } })
            .then(() => res.json({ message: 'Xóa sản phẩm thành công' }))
            .catch(next)
    }
}

module.exports = new ProductController