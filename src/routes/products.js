const express = require('express')
const router = express.Router()
const productController = require('../app/controllers/ProductController')
const upload = require('../app/middlewares/upload')

router.get('/create', productController.create)
router.post('/store', upload.single('image'), productController.store)
router.get('/list', productController.list)
router.get('/:id/edit', productController.edit)
router.put('/:id/update', upload.single('image'), productController.update)
router.delete('/:id/delete', productController.delete)
router.delete('/bulk-delete', productController.bulkDelete)
router.get('/:slug', productController.show)
router.get('/page/:page', productController.list)

module.exports = router