'use strict';

import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { UserRolesDTO } from "../../../Models/user";

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