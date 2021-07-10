const router = require('express').Router()
const user = require('./user')
const arisan = require('./arisan')

router.use(user)
router.use(arisan)

module.exports = router