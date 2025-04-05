'use strict';

import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { PrivilegesProjectDBO } from "../../DBO/privileges";

/**
 * Interface for PrivilegesProject instance
 */
interface PrivilegesProjectInstance extends Model<PrivilegesProjectDBO>, PrivilegesProjectDBO {}

/**
 * PrivilegesProject model initialization
 */
export class PrivilegesProject extends Model<PrivilegesProjectInstance, PrivilegesProjectDBO> {
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