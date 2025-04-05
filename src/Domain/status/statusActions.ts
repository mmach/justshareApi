'use strict';

import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { StatusActionsDBO } from "../../DBO/status";

/**
 * Interface for StatusActions instance
 */
interface StatusActionsInstance extends Model<StatusActionsDBO>, StatusActionsDBO {}

/**
 * StatusActions model initialization
 */
export class StatusActions extends Model<StatusActionsInstance, StatusActionsDBO> {
  static initModel(sequelize: Sequelize): ModelStatic<StatusActions> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        status_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        action_id: {
          type: DataTypes.UUID,
          allowNull: true
        }
      },
      { 
        sequelize,
        tableName: 'StatusActions'
      }
    );
  }

  static associate(models: any) {
    StatusActions.belongsTo(models.StatusProjects, { as: "status", targetKey: 'id', foreignKey: "status_id" });
  }

  static hooks(models: any, sequelize: Sequelize) {
    // Define hooks here
  }
}