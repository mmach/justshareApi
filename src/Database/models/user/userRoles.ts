'use strict';

import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";
import { ProjectDTO } from "../project/project";
import { RolesProjectDTO } from "../roles/rolesProject";

/**
 * Interface for UserRoles attributes
 */
export interface UserRolesDTO {
  id: string;
  user_id?: string;
  project_id?: string;
  role_id?: string;
  name?: string;

  project?: ProjectDTO;
  roles?: RolesProjectDTO;
}

/**
 * Interface for UserRoles instance
 */
export interface UserRolesInstance extends Model<UserRolesDTO>, UserRolesDTO {}

/**
 * UserRoles model initialization
 */
export default class UserRoles extends Model<UserRolesInstance, UserRolesDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<UserRoles> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        user_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        project_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        role_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        name: {
          type: DataTypes.STRING,
          allowNull: true
        }
      },
      { 
        sequelize,
        tableName: 'UserRoles'
      }
    );
  }

  static associate(models: any) {
    UserRoles.belongsTo(models.Project, { as: "project", targetKey: 'id', foreignKey: "project_id" });
    UserRoles.belongsTo(models.RolesProject, { as: "roles", targetKey: 'id', foreignKey: "role_id" });
  }
}