const express = require('express')
const router = express.Router()
const ArisanController = require('../controllers/arisan.controller')
const { authenticate, authorize_arisan } = require('../middlewares/auth')

router.get('/arisan/:arisan_id', ArisanController.getOne)
router.delete('/arisan/:arisan_id', authorize_arisan, ArisanController.deleteOne)
router.put('/arisan/:arisan_id', ArisanController.editOne)
router.post('/arisan', authenticate , ArisanController.addNew)

module.exports = router