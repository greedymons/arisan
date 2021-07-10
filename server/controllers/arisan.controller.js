const { Arisan, Arisan_slot } = require('../models')
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
      const { ArisanId, arisan_status, participant_status } = req.body
      const arisan_id = req.params.arisan_id
      let data, participants = []
      if (arisan_status == "legal-by-romi") {
        data = await Arisan.findOne({
          where: {
            id: arisan_id,
            status: arisan_status
          }
        })
      } else if (arisan_status == "illegal") {
        data = await Arisan.findOne({
          where: {
            id: arisan_id
          }
        })
      }
      participants = await Arisan_slot.findAll({
        where: { ArisanId: ArisanId}
      })

      res.status(200).json({
        status: 'success',
        result: data == null ? 'not found' : data,
        participants: participants == null || data == null ? 'not found' : participants,
      })
    } catch (error) {
      console.log(error);
      next(error)
    }
  }
  static async editOne(req, res, next) {
    try {
      const { title, description, end_date } = req.body
      const newArisan = {
        title, description, status, end_date,
        UserId: req.user.id
      }
      let data = await Arisan.update(newArisan, 
        {where: {id : req.params.arisan_id}})
      if (data) {
        res.status(201).json({
          status: 'success'
        })
      } else {
        throw new Error('Failed update Arisan')
      }
    } catch (error) {
      next(error)
    }
  }
  static async deleteOne(req, res, next) {
    try {
      let data = await Arisan.destroy({
        where: {id: req.params.arisan_id}
      })
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
  static async statusProcess(req, res, next) {
    try {
      let data_arisan = await Arisan.findOne({
        where: {
          id: req.params.arisan_id
        }
      })
      const newArisan = {
        status: data_arisan.status != "legal-by-romi" ? "legal-by-romi" : "illegal"
      }
      let data = await Arisan.update(newArisan, {
        where: {
          id: req.params.arisan_id
        }
      })
      if (data_arisan.id && data[0] == 1) {
        res.status(200).json({
          status: 'success'
        })
      } else {
        throw new Error ('Arisan Not found')
      }
    } catch (error) {
        next(error)
    }
  }
}

module.exports = ArisanController