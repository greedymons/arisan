'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Arisan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Arisan.belongsTo(models.User, {
        foreignKey:'UserId'
      })
      Arisan.hasMany(models.Arisan_slot)
    }
  };
  Arisan.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Please enter arisan title'
        }
      }
    },
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please insert your due date!'
        }
      }
    },
    UserId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Arisan',
    hooks: {
      beforeCreate(arisan, options) {
        arisan.start_date = new Date().toString()
      }
    }
  });
  return Arisan;
};