'use strict';

import { Model } from "sequelize";
/**
 *
 * @export
 * @class Users
 * @extends Sequelize.Model
 */
export default class Dimensions extends Model {
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
        uniq_name:
        {
          type: DataTypes.STRING,
          allowNull: true
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true
        },
        co_type_id:{
          type: DataTypes.UUID,
          allowNull: true

        },
        cott_id:{
          type: DataTypes.UUID,
          allowNull: true

        },
        as_cat_ref:{
          type:DataTypes.BOOLEAN
        },
        project_id: {
          type: DataTypes.STRING,
          allowNull: true
        },
      },
      { sequelize }
    );
  }
  static associate(models) {

    // Users.hasOne(models.Blob, { as: "blob_profile", targetKey: 'id', foreignKey: "blob_id" });


    // Users.hasMany(models.UserAuth)
  }
}
