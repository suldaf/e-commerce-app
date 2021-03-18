"use strict";
const { Model } = require("sequelize");
const { hash } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany( models.Product, { through: models.Cart })
      // define association here
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: "Email has been used",
        },
        validate: {
          isEmail: {
            args: true,
            msg: "Invalid format email",
          },
          notEmpty: {
            args: true,
            msg: "Email must be filled",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [4, 10],
            msg: "Password must be more then 6 characters",
          },
          notEmpty: {
            args: true,
            msg: "Password must be filled",
          },
        },
      },
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate (user,opt) {
          user.password = hash(user.password)
          if (!user.role) {
            user.role = 'custommer'
          }
        }
      }
    }
  );
  return User;
};
