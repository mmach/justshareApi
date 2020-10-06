"use strict";
import { Model } from "sequelize";

/**
 *
 * @export
 * @class Item
 * @extends Sequelize.Model
 */
export default class ActionPrivileges extends Model {
  /**
   *
   * @static
   * @param  {any} sequelize
   * @param  {any} DataTypes
   * @return {ActionPrivileges|Model}
   * @memberof ActionPrivileges
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
        privilege_id: {
          type: DataTypes.UUID,
        },
        project_id: {
          type: DataTypes.UUID,
        },
        action_id: {
          type: DataTypes.UUID
        },
        logical_op: {
          type: DataTypes.STRING
        },
        status: {
          type: DataTypes.BOOLEAN
        },
      },
      { sequelize ,
        tableName: 'ActionPrivileges'
      }
    );
  }
  static associate(models) {
    ActionPrivileges.belongsTo(models.PrivilegesProject, { as: "privileges", targetKey: 'id', foreignKey: "privilege_id" });

  }
}
