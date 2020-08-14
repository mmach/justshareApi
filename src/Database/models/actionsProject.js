'use strict';

import { Model } from "sequelize";
/**
 *
 * @export
 * @class Users
 * @extends Sequelize.Model
 */
export default class ActionsProject extends Model {
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
        project_id: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        status: {
          type: DataTypes.STRING,
          allowNull: true
        }

      },
      { sequelize }
    );
  }
  static associate(models) {
    ActionsProject.belongsTo(models.Actions, { as: "action_details", targetKey: 'id', foreignKey: "action_id" });
    ActionsProject.hasMany(models.ActionPrivileges, { as: "action_privileges", targetKey: 'id', foreignKey: "action_id" });
    ActionsProject.hasMany(models.StatusActions, { as: "statuses", targetKey: 'id', foreignKey: "action_id" });

    
    // Users.hasOne(models.Blob, { as: "blob_profile", targetKey: 'id', foreignKey: "blob_id" });


    // Users.hasMany(models.UserAuth)
  }
}
