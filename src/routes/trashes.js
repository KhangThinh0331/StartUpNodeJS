const express = require('express')
const router = express.Router()
const trashController = require('../app/controllers/TrashController')

router.get('/', trashController.show)
router.patch('/:id/restore', trashController.restore)
router.patch('/bulk-restore', trashController.bulkRestore)
router.delete('/:id/force', trashController.forceDelete)
router.delete('/bulk-force', trashController.bulkForceDelete)
router.get('/page/:page', trashController.show)

module.exports = router