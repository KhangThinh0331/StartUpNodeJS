const express = require('express')
const router = express.Router()
const trashController = require('../app/controllers/TrashController')

router.get('/trashes', trashController.show)
router.patch('/trashes/:id/restore', trashController.restore)
router.patch('/trashes/bulk-restore', trashController.bulkRestore)
router.delete('/trashes/:id/force', trashController.forceDelete)
router.delete('/trashes/bulk-force', trashController.bulkForceDelete)

module.exports = router