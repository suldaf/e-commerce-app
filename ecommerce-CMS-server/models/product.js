"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsToMany( models.User, { through: models.Cart })
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Name must be filed",
          },
        },
      },
      image_url: DataTypes.STRING,
      price: {
        type: DataTypes.DOUBLE,
        validate: {
          min: {
            args: 1,
            msg: "Price must be greater than 0",
          },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        validate: {
          min: {
            args: -1,
            msg: "Stock must be greater than or equal 0",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Product",
      hooks: {
        beforeCreate(product, opt) {
          if (
            typeof product.name !== "string" ||
            typeof product.image_url !== "string" ||
            typeof product.price !== "number" ||
            typeof product.stock !== "number"
          ) {
            throw {
              message: "Data type is not match",
              status: 400,
              name: "Custom",
            };
          }
        },
      },
    }
  );
  return Product;
};
