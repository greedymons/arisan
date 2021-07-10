const express = require('express')
const router = express.Router()
const Arisan_slotController = require('../controllers/arisan_slot.controller')
const { authenticate, authorize_arisan, authorize_super_admin_arisan, authorize_admin_arisan } = require('../middlewares/auth')

router.post('/arisan/slot', authenticate, Arisan_slotController.addNew)
router.get('/arisan/slot/:arisan_slot_id', authenticate, Arisan_slotController.getOne)
router.delete('/arisan/slot/:arisan_slot_id', authorize_admin_arisan, Arisan_slotController.deleteOne)
router.put('/arisan/status/slot/:arisan_slot_id', authorize_admin_arisan, Arisan_slotController.editStatusSlot)
router.put('/arisan/payment/slot/:arisan_slot_id', authorize_admin_arisan, Arisan_slotController.editPaymentSlot)

module.exports = router