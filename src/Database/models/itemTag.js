"use strict";
import { Model } from "sequelize";

/**
 *
 * @export
 * @class Item
 * @extends Sequelize.Model
 */
export default class ItemTag extends Model {
  /**
   *
   * @static
   * @param  {any} sequelize
   * @param  {any} DataTypes
   * @return {Item|Model}
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
        tag_id: {
          type: DataTypes.UUID,
          allowNull: false
        },
        item_id: {
          type: DataTypes.UUID,
          allowNull: false
        }
       
      },
      { sequelize }
    );
  }
  static associate(models) {
 
  }
}
