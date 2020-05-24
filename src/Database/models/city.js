"use strict";
import { Model } from "sequelize";

/**
 *
 * @export
 * @class Item
 * @extends Sequelize.Model
 */
export default class City extends Model {
  /**
   *
   * @static
   * @param  {any} sequelize
   * @param  {any} DataTypes
   * @return {Region|Model}
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
        name: {
          type: DataTypes.STRING,
          allowNull: true
        },
        status: {
          type: DataTypes.STRING(255),
          allowNull: true
        },
        
        country_id: {
          type: DataTypes.UUID,
          allowNull: false
        },
        uid: DataTypes.STRING(50),

        name_clob: DataTypes.TEXT,
        name_clear: DataTypes.STRING(255),
        longitude: DataTypes.FLOAT,
        latitude: DataTypes.FLOAT,
        population:DataTypes.INTEGER
      },
      { sequelize }
    );
  }
  static associate(models) {
 
  }
}
