'use strict';

import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { RolesProjectDTO } from "../../../Models/roles";
/**
 * Interface for RolesProject instance
 */
export interface RolesProjectInstance extends Model<RolesProjectDTO>, RolesProjectDTO {}

/**
 * RolesProject model initialization
 */
export default class RolesProject extends Model<RolesProjectInstance, RolesProjectDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<RolesProject> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        role_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        project_id: {
          type: DataTypes.UUID,
          allowNull: true
        }
      },
      { 
        sequelize,
        tableName: 'RolesProjects'
      }
    );
  }

  static associate(models: any) {
    RolesProject.belongsTo(models.Project, { as: "project", targetKey: 'id', foreignKey: "project_id" });
    RolesProject.belongsTo(models.Roles, { as: "role_detail", targetKey: 'id', foreignKey: "role_id" });
  }
}