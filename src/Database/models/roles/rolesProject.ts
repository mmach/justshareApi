'use strict';

import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";
import { ProjectDTO } from "../project/project";
import { RolesDTO } from "./roles";

/**
 * Interface for RolesProject attributes
 */
export interface RolesProjectDTO {
  id: string;
  role_id?: string;
  project_id?: string;

  project?: ProjectDTO;
  role_detail?: RolesDTO;
}

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