const { Arisan_slot } = require('../models')

class Arisan_slotController {
  static async addNew(req, res, next) {
    try {
      const { ArisanId } = req.body
      const newArisan = {
        ArisanId,
        UserId: req.user.id
      }
      let data = await Arisan_slot.create(newArisan)
      if (data) {
        res.status(201).json({
          status: 'success',
          result: data
        })
      } else {
        throw new Error('Failed created Arisan')
      }
    } catch (error) {
      console.log(error);
      next(error)
    }
  }
  static async editStatusSlot(req, res, next) {
    try {
      const { status } = req.body
      if (status != 'approved' && status != 'unapproved') throw new Error('status must be approved or unapproved')
      const newArisan = {
        status
      }
      let data = await Arisan_slot.update(newArisan,
        { where: { id: req.params.arisan_slot_id } })
      if (data) {
        res.status(201).json({
          status: 'success',
          result: data
        })
      } else {
        throw new Error('Failed update status Slot Arisan')
      }
    } catch (error) {
      console.log(error);
      next(error)
    }
  }
  static async editPaymentSlot(req, res, next) {
    try {
      const { payment } = req.body
      if (payment < 1 || payment > 4) throw new Error('payment status must be 1 - 4')
      const newArisan = {
        payment
      }
      let data = await Arisan_slot.update(newArisan,
        { where: { id: req.params.arisan_slot_id } })
      if (data) {
        res.status(200).json({
          status: 'success',
          result: data
        })
      } else {
        throw new Error('Failed update status Slot Arisan')
      }
    } catch (error) {
      console.log(error);
      next(error)
    }
  }
  static async deleteOne(req, res, next) {
    try {
      let data = await Arisan_slot.destroy({
        where: { id: req.params.arisan_slot_id }
      })
      if (data) {
        res.status(200).json({
          status: 'success'
        })
      } else {
        throw new Error('Failed delete Arisan Slot')
      }
    } catch (error) {
      console.log(error);
      next(error)
    }
  }
}

module.exports = Arisan_slotController