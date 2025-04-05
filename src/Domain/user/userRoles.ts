'use strict';

import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { UserRolesDBO } from "../../DBO/user";

/**
 * Interface for UserRoles instance
 */
interface UserRolesInstance extends Model<UserRolesDBO>, UserRolesDBO {}

/**
 * UserRoles model initialization
 */
export class UserRoles extends Model<UserRolesInstance, UserRolesDBO> {
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