"use strict";
import { Model } from "sequelize";



/**
 *
 * @export
 * @class Item
 * @extends Sequelize.Model
 */
export default class ItemProcessState extends Model {
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
        item_id: {
          type: DataTypes.STRING,
          allowNull: false
        },
        project_id: {
          type: DataTypes.STRING,
          allowNull: false
        },
        user_id: {
          type: DataTypes.UUID,
          allowNull: false
        },
        process_id: {
          type: DataTypes.UUID,
          allowNull: false
        },
        process_chain_id: {
          type: DataTypes.UUID,
          allowNull: false
        },
        step_order: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
      },
      { sequelize,
        tableName: 'ItemProcessStates'
      }    );
  }
  static hooks(models) {


  }
  static associate(models) {


  }
}
