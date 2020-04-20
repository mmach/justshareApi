"use strict";
import { Model } from "sequelize";

/**
 *
 * @export
 * @class Item
 * @extends Sequelize.Model
 */
export default class Config extends Model {
  /**
   *
   * @static
   * @param  {any} sequelize
   * @param  {any} DataTypes
   * @return {Country|Model}
   * @memberof Item
   */
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: sequelize.UUIDV4

        },
        project_id: {
          type: DataTypes.UUID,
          allowNull: false
        },
        type: {
          type: DataTypes.STRING(255),
          allowNull: true
        },
        lang: DataTypes.STRING(50),
        body: DataTypes.TEXT,
      },
      { sequelize }
    );
  }
  static associate(models) {
   /* Item.belongsToMany(models.Category, {
      through: {
        model: models.ItemCategory,
        targetKey: "id",
        foreignKey: "continent_id"
      },
      as: "continents",
      targetKey: "id",
      foreignKey: "item_id"
    });
    
    Item.hasMany(models.Blob, {
      as: "blobs",
      targetKey: "id",
      foreignKey: "item_id"
    });
    //  Item.belongsTo(models.User);
    // Item.hasMany(models.ItemCategory)
    //  Blob.belongsTo(models.User);*/
  }
}

/*


module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(1024),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clobSearch: DataTypes.TEXT,
    clobSearch_pl: DataTypes.TEXT,
    clobSearch_us: DataTypes.TEXT
  }, {underscored: true});
  Item.associate = function(models) {
    Item.belongsTo(models.User);
    Item.hasMany(models.ItemCategory)
    // associations can be defined here
  };
  return Item;
};*/
