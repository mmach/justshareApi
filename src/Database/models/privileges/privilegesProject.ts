'use strict';

import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";
import { PrivilegesDTO } from "./privileges";

/**
 * Interface for PrivilegesProject attributes
 */
export interface PrivilegesProjectDTO {
  id: string;
  privilege_id?: string;
  project_id?: string;
  status?: boolean;

  privilege_details?: PrivilegesDTO;

}

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