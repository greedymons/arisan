const express = require('express')
const router = express.Router()
const UserController = require('../controllers/user.controller')

router.post('/auth/signup', UserController.addNew)
router.get('/auth/all-users', UserController.allUsers)
router.post('/auth/signin', UserController.login)
router.delete('/auth/delete/:user_id', UserController.deleteUser)
router.put('/auth/edit/:user_id', UserController.editUser)

module.exports = router