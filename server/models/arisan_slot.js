'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Arisan_slot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Arisan_slot.init({
    UserId: DataTypes.INTEGER,
    ArisanId: DataTypes.INTEGER,
    status: DataTypes.STRING, 
    /*
    approved = sudah di acc admin
    unapproved = belum di acc admin
    */
    payment: DataTypes.INTEGER,
    /* 
    bbb = belum bayar belum narik [1]
    bbs = belum bayar sudah narik [2]
    sbb = sudah bayar belum narik [3]
    sbs = sudah bayar sudah narik [4]
    */
    join_date: DataTypes.DATE,
    message: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Arisan_slot',
    hooks:{
      beforeCreate(Arisan_slot, options) {
        Arisan_slot.join_date = new Date().toString()
        Arisan_slot.payment = 1
        Arisan_slot.status = 'unapproved'
        Arisan_slot.message = 'Hey There I am Using Arisan By greedymons'
      }
    }
  });
  return Arisan_slot;
};