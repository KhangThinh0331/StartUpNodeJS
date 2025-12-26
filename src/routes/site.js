const express = require('express')
const router = express.Router()
const siteController = require('../app/controllers/SiteController')

router.get('/', siteController.index)
router.get('/page/:page', siteController.index)
router.post('/', siteController.search)

module.exports = router