'use strict';
import { Model } from 'sequelize';
import uuidv4 from "uuid/v4";

/**
 * 
 * @export
 * @class Category
 * @extends Sequelize.Model
 */
export default class V_Category extends Model {

  /**
   * 
   * @static
   * @param  {any} sequelize 
   * @param  {any} DataTypes 
   * @return {Category|Model}
   * @memberof Users
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
        category: {
         type: DataTypes.STRING,
         allowNull: false,
       },
      category_pl: DataTypes.STRING,
       category_us: DataTypes.STRING,
       category_de: DataTypes.STRING,
       category_ru: DataTypes.STRING,
       category_fr: DataTypes.STRING,
       category_es: DataTypes.STRING,
       category_no: DataTypes.STRING,
       category_zh_cn: DataTypes.STRING,
        status: DataTypes.INTEGER,
        forThing: DataTypes.INTEGER,
        forSell: DataTypes.INTEGER,
        forEvent: DataTypes.INTEGER,
        // icon: DataTypes.STRING,
        expired_day: DataTypes.INTEGER,
        project_id: DataTypes.UUID,
        blob_id: DataTypes.UUID,
        color: DataTypes.STRING,
        translation_id: DataTypes.UUID




      },
      { sequelize }
    );
  }


  

  static associate(models) {
    //  Category.belongsTo(models.CategoryHierarchy, { as: "category_parent", targetKey: 'category_child_id', foreignKey: "id" });
    V_Category.belongsToMany(models.V_Category, {
      through: { model: models.CategoryHierarchy },
      as: 'category_children',
      targetKey: 'id',
      foreignKey: "category_parent_id"
    });

    V_Category.belongsTo(models.Blob, { as: "icon_blob", targetKey: 'id', foreignKey: "blob_id" });
    V_Category.hasMany(models.CategoryActions, { as: "actions", targetKey: 'id', foreignKey: "category_id" });
   
    V_Category.belongsToMany(models.V_Category, {
      through: { model: models.CategoryHierarchy },
      as: 'category_parent',
      targetKey: 'id',
      foreignKey: "category_child_id"
    });

    V_Category.belongsTo(models.Translations, { as: "translation", targetKey: 'id', foreignKey: "translation_id" });

  }
}

