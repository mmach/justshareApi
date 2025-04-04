'use strict';

import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { PrivilegesProjectDTO } from "../../../Models/privileges";

/**
 * Interface for PrivilegesProject instance
 */
export interface PrivilegesProjectInstance extends Model<PrivilegesProjectDTO>, PrivilegesProjectDTO {}

/**
 * PrivilegesProject model initialization
 */
export default class PrivilegesProject extends Model<PrivilegesProjectInstance, PrivilegesProjectDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<PrivilegesProject> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        privilege_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        project_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        status: {
          type: DataTypes.BOOLEAN
        }
      },
      { 
        sequelize,
        tableName: 'PrivilegesProjects'
      }
    );
  }

  static associate(models: any) {
    PrivilegesProject.belongsTo(models.Privileges, { as: "privilege_details", targetKey: 'id', foreignKey: "privilege_id" });
  }
}