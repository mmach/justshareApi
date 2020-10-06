"use strict";
import { Model } from "sequelize";

/**
 *
 * @export
 * @class Item
 * @extends Sequelize.Model
 */
export default class CategoryOptionsTypeTemplate extends Model {
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
        cot_id: {
          type: DataTypes.UUID,
        },
        type: {
          type: DataTypes.STRING,
        },
        status: {
          type: DataTypes.BOOLEAN,
        },
        order: {
          type: DataTypes.INTEGER,
        },
        is_func: {
          type: DataTypes.BOOLEAN,
        },
       

      },
      { sequelize,
        tableName: 'CategoryOptionsTypeTemplates'
      }
    );
  }
  static associate(models) {
 
  }
}
