const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user.controller')
const { authenticate, authorize_arisan, authorize_super_admin_arisan, authorize_admin_arisan } = require('../middlewares/auth')

router.post('/auth/signup', UserController.addNew)
router.get('/auth/all-users', authorize_super_admin_arisan, UserController.allUsers)
router.post('/auth/signin', UserController.login)
router.delete('/auth/delete/:user_id', authorize_super_admin_arisan, UserController.deleteUser)
router.put('/auth/edit/:user_id', UserController.editUser)

module.exports = router