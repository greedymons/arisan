const { User } = require('../models')
const { comparePass } = require('../helpers/encrypt')
const { generateToken } = require('../helpers/jwt')
const valid = require('../helpers/validation')

class UserController {
  static addNew(req, res, next) {
    const { name, password, email, type_user, profile_picture, description } = req.body
    User.create({ name, password, email, type_user, profile_picture, description })
      .then(data => {
        res.status(201).json({
          status: 'success',
          result: {
            name, 
          }
        })
      })
      .catch(err => {
        next(err)
      })
  }
  static async editUser(req, res, next) {
    try {
      const { name, password, email, type_user, profile_picture, description } = req.body
      let data = await User.update(
        { name, password, email, type_user, profile_picture, description },
        { where: { id: req.params.user_id }})
      if (data != 1) throw new Error ('User not found')
      res.status(200).json({
        status : 'success'
      })
    } catch (error) {
      next(error)
    }
  }
  static deleteUser(req, res, next) {
    User.destroy(
      { where: { id: req.params.user_id } })
      .then(data => {
        if (data == 0) throw new Error ('That user does not exist')
        res.status(200).json({
          status: 'success'
        })
      })
      .catch(err => {
        next(err)
      })
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body
      let validation = ["email", "password"];
      await valid.requiredValidation(req.body, validation);

      let data = await User.findOne({where: {email: email}})
      console.log(data,'<<<');
      if (!data) {
        next({ name: 'Wrong Email' })
      }
      if (comparePass(password, data.password)) {
        const payload = {
          id: data.id,
          name: data.name,
          email: data.email,
          type_user: data.type_user,
          profile_picture: data.profile_picture,
          description: data.description
        }
        const access_token = generateToken(payload)
        console.log('helloo');
        return res.status(200).json({
          access_token: access_token
        })
      } else {
        next({ name: 'Wrong Password' })
      }
    }
    catch (error) {
      next(error)
    }
  }
  static async allUsers(req, res, next) {
    try {
      let data = await User.findAll()
      res.status(200).json({
        status: 'success',
        result: data
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController