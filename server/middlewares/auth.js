const { User, Arisan, Arisan_slot } = require('../models')
const { cekToken } = require('../helpers/jwt')

const authenticate = async (req, res, next) => {
  try {
    let decoded = cekToken(req.headers.access_token)
    let user = await User.findOne({
      where: {
        email: decoded.email
      }
    })

    if (user) {
      req.user = user
      next()
    } else {
      next({ name: 'Forbidden' })
    }
  } catch (err) {
    next(err)
  }
}

const authorize_arisan_slot = async (req, res, next) => {
  try {
    let arisan_slot_id = req.params.arisan_slot_id
    let data_arisan_slot = await Arisan_slot.findByPk(arisan_slot_id)
    let user_id = data_arisan_slot.UserId
    let data_user = await User.findByPk(user_id)
    if (data_user.id == user_id) {
      next()
    }
  } catch (error) {
    next(error)
  }
}

const authorize_arisan = async (req, res, next) => {
  try {
    let data_arisan = await Arisan.findByPk(req.params.arisan_id)
    let decoded = cekToken(req.headers.access_token)
    let user = await User.findOne({
      where: {
        email: decoded.email
      }
    })
    if (data_arisan && user) {
      if (data_arisan.UserId == user.id) next()
    } else {
      throw new Error ('Forbidden')
    }
  } catch (error) {
    next(error)
  }
}

const authorize_user = async (req, res, next) => {
  User.findByPk(req.params.id)
    .then(data => {
      if (!data) {
        next({ name: 'NotFound' })
      } else if (data.UserId !== req.user.id) {
        next({ name: 'Unauthorized' })
      } else {
        next()
      }
    })
    .catch(err => {
      next(err)
    })
}

module.exports = {
  authenticate,
  authorize_user,
  authorize_arisan_slot,
  authorize_arisan
}