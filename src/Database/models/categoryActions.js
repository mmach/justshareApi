'use strict';

import { Model } from "sequelize";
/**
 *
 * @export
 * @class Users
 * @extends Sequelize.Model
 */
export default class CategoryActions extends Model {
  /**
   *
   * @static
   * @param  {any} sequelize
   * @param  {any} DataTypes
   * @return {ActionsProject|Model}
   * @memberof ActionsProject
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
        action_id: {
          type: DataTypes.STRING,
          allowNull: true
        },
        category_id: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        }
        
      },
      { sequelize ,
        tableName: 'CategoryActions'
      }
    );
  }
  static associate(models) {

    // Users.hasOne(models.Blob, { as: "blob_profile", targetKey: 'id', foreignKey: "blob_id" });


    // Users.hasMany(models.UserAuth)
  }
}
