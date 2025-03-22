'use strict';

import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";

/**
 * Interface for StatusActions attributes
 */
export interface StatusActionsDTO {
  id: string;
  status_id?: string;
  action_id?: string;
}

/**
 * Interface for StatusActions instance
 */
export interface StatusActionsInstance extends Model<StatusActionsDTO>, StatusActionsDTO {}

/**
 * StatusActions model initialization
 */
export default class StatusActions extends Model<StatusActionsInstance, StatusActionsDTO> {
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