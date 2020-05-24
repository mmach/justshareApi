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
   
  }
}
