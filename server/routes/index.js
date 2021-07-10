const router = require('express').Router()
const user = require('./user')
const arisan = require('./arisan')
const arisan_slot = require('./arisan_slot')

router.use(user)
router.use(arisan)
router.use(arisan_slot)

module.exports = router