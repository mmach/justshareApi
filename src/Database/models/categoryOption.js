"use strict";
import { Model } from "sequelize";

/**
 *
 * @export
 * @class Item
 * @extends Sequelize.Model
 */
export default class CategoryOption extends Model {
  /**
   *
   * @static
   * @param  {any} sequelize
   * @param  {any} DataTypes
   * @return {Region|Model}
   * @memberof CategoryOption
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
        cot_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
     
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false
        }, name_pl: {
          type: DataTypes.STRING,

        },
        name_us: {
          type: DataTypes.STRING,

        },
        name_de: {
          type: DataTypes.STRING,

        },
        name_ru: {
          type: DataTypes.STRING,

        },
        name_fr: {
          type: DataTypes.STRING,

        }, name_es: {
          type: DataTypes.STRING,

        },
        name_no: {
          type: DataTypes.STRING,

        },
        name_zh_cn: {
          type: DataTypes.STRING,
        },
        status: {
          type: DataTypes.BOOLEAN,
        },
        order: {
          type: DataTypes.INTEGER,
        },
        is_searchable: {
          type: DataTypes.BOOLEAN,
        },is_require: {
          type: DataTypes.BOOLEAN,
        },
        limit_of: {
          type: DataTypes.INTEGER,
        },
        is_on_pin_map: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        is_on_map:{
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        is_form_hidden:{
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        search_label:{
          type: DataTypes.STRING,
          allowNull: true
        },
        search_type:{
          type: DataTypes.STRING,
          allowNull: true
        },
        show_value:{
          type: DataTypes.STRING,
          allowNull: true
        },
        can_above_pin:{
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        
        is_visible_view: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        project_id:DataTypes.UUID

      },
      { sequelize }
    );
  }
  static associate(models) {

    CategoryOption.belongsTo(models.CategoryOptionsType, { as: "cat_opt", targetKey: 'id', foreignKey: "cot_id" });
    CategoryOption.hasMany(models.CategoryOptionsTemplate, { as: "cat_opt_temp", targetKey: 'co_id', foreignKey: "co_id" });
    CategoryOption.hasMany(models.CategoryOptionsLink, { as: "category_link", targetKey: 'co_id', foreignKey: "co_id" });

  
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
