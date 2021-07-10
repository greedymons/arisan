const { Arisan } = require('../models')
const valid = require('../helpers/validation')

class ArisanController {
  static async addNew(req, res, next) {
    try {
      const { title, description, status, end_date } = req.body
      let validation = ["title", "description", "status", "end_date"];
      await valid.requiredValidation(req.body, validation);
      let b = new Date(end_date).toString()
      console.log(b);
      const newArisan = {
        title, description, status, end_date: b,
        UserId: req.user.id
      }
      let data = await Arisan.create(newArisan)
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
  static async getOne (req, res, next) {
    try {
      const arisan_id = req.params.arisan_id
      let data = await Arisan.findOne({
        where: {id: arisan_id}
      })
      res.status(200).json({
        status: 'success',
        result: data
      })
    } catch (error) {
      next(error)
    }
  }
  static async editOne(req, res, next) {
    try {
      const { title, description, status, end_date } = req.body
      const newArisan = {
        title, description, status, end_date,
        UserId: req.user.id
      }
      let data = await Arisan.update(newArisan, 
        {where: {id : req.params.arisan_id}})
      if (data) {
        res.status(201).json({
          status: 'success',
          result: data
        })
      } else {
        throw new Error('Failed update Arisan')
      }
    } catch (error) {
      console.log(error);
      next(error)
    }
  }
  static async deleteOne(req, res, next) {
    try {
      // let data = await Arisan.destroy({
      //   where: {id: req.params.arisan_id}
      // })
      if (data) {
        res.status(201).json({
          status: 'success'
        })
      } else {
        throw new Error('Failed delete Arisan')
      }
    } catch (error) {
      console.log(error);
      next(error)
    }
  }
}

module.exports = ArisanController