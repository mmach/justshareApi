"use strict";
import { Model } from "sequelize";
import uuidv4 from "uuid/v4";



/**
 *
 * @export
 * @class Item
 * @extends Sequelize.Model
 */
export default class Comment extends Model {
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
        user_src_id: {
          type: DataTypes.UUID,
        },
        user_id: {
          type: DataTypes.UUID,
        },
        iua_id: {
          type: DataTypes.UUID,
        },
        item_id: {
          type: DataTypes.UUID,
        },
        comment: DataTypes.TEXT,
        rate: DataTypes.INTEGER,

        project_id: {
          type: DataTypes.UUID,
          allowNull: false
        },
        action_id: {
          type: DataTypes.UUID,
        },
        status: DataTypes.STRING

      },
      { sequelize }
    );
  }
  static hooks(models) {



  }
  static associate(models) {

  }
}
