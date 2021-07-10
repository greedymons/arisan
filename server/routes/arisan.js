const express = require('express')
const router = express.Router()
const ArisanController = require('../controllers/arisan.controller')
const { authenticate, authorize_arisan, authorize_super_admin_arisan, authorize_admin_arisan } = require('../middlewares/auth')

router.get('/arisan/:arisan_id', ArisanController.getOne)
router.delete('/arisan/:arisan_id', authorize_arisan, ArisanController.deleteOne) 
router.post('/arisan/process-approved/:arisan_id', ArisanController.statusProcess) // authorize romi
router.put('/arisan/:arisan_id', authenticate, authorize_arisan, ArisanController.editOne)
router.post('/arisan', authenticate , ArisanController.addNew)

module.exports = router