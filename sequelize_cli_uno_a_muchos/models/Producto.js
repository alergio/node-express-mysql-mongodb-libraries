"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Producto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Producto.belongsTo(models.Categoria, {
        foreignKey: "idCategoria",
        targetKey: "id",
      });
    }
  }
  Producto.init(
    {
      descripcion: DataTypes.STRING,
      idCategoria: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Producto",
    }
  );
  return Producto;
};
