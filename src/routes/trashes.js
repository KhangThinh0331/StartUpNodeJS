const express = require('express')
const router = express.Router()
const trashController = require('../app/controllers/TrashController')

router.get('/trashes', trashController.show)
router.patch('/trashes/:id/restore', trashController.restore)
router.delete('/trashes/:id/force', trashController.forceDelete)

module.exports = router