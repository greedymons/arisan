'use strict';
const { hashPassword } = require('../helpers/encrypt')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Arisan)
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please enter your name'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args:[6],
          msg:'Password atleast have 6 chars'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate:{
        isEmail:{
          msg:'Please enter valid email'
        }
      }
    },
    type_user: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'type must be filled'
        }
      }
    },
    profile_picture: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks:{
      beforeCreate(user, options) {
        user.password = hashPassword(user.password)
      }
    }
  });
  return User;
};