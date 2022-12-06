"use strict";
import { Model } from "sequelize";

/**
 *
 * @export
 * @class Item
 * @extends Sequelize.Model
 */
export default class CategoryOptionsType extends Model {
  /**
   *
   * @static
   * @param  {any} sequelize
   * @param  {any} DataTypes
   * @return {Region|Model}
   * @memberof CategoryOptionsType
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
        name: {
          type: DataTypes.STRING,
        },
        type: {
          type: DataTypes.STRING,
        },
        status: {
          type: DataTypes.BOOLEAN,
        },
        is_strict:{
          type: DataTypes.BOOLEAN,
        },
   
        
      },
      { sequelize,
        tableName: 'CategoryOptionsTypes'
      }
    );
  }
  static associate(models) {
    CategoryOptionsType.hasMany(models.CategoryOptionsTypeTemplate, {
      as: "cat_options_type_temp",
      targetKey: "id",
      foreignKey: "cot_id"
    });
  
  }
}
