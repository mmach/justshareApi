'use strict';

import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { UserTypeRolesDTO } from "../../../Models/user";

/**
 * Interface for UserTypeRoles instance
 */
export interface UserTypeRolesInstance extends Model<UserTypeRolesDTO>, UserTypeRolesDTO {}

/**
 * UserTypeRoles model initialization
 */
export default class UserTypeRoles extends Model<UserTypeRolesInstance, UserTypeRolesDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<UserTypeRoles> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        usertype_id: {
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
        tableName: 'UserTypeRoles'
      }
    );
  }

  static associate(models: any) {
    UserTypeRoles.belongsTo(models.UserTypes, { as: "type", targetKey: 'id', foreignKey: "usertype_id" });
    UserTypeRoles.belongsTo(models.Project, { as: "project", targetKey: 'id', foreignKey: "project_id" });
    UserTypeRoles.belongsTo(models.RolesProject, { as: "roles", targetKey: 'id', foreignKey: "role_id" });
  }
}