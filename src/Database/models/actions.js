'use strict';

import { Model } from "sequelize";
/**
 *
 * @export
 * @class Users
 * @extends Sequelize.Model
 */
export default class Actions extends Model {
  /**
   *
   * @static
   * @param  {any} sequelize
   * @param  {any} DataTypes
   * @return {Language|Model}
   * @memberof Language
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
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true
        },
        for_category: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        action_type: {
          type: DataTypes.STRING,
          allowNull: true
        }
      },
      { sequelize }
    );
  }
  static associate(models) {

    // Users.hasOne(models.Blob, { as: "blob_profile", targetKey: 'id', foreignKey: "blob_id" });


    // Users.hasMany(models.UserAuth)
  }
}
