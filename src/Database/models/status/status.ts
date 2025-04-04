'use strict';

import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { StatusDTO } from "../../../Models/status";
/**
 * Interface for Status instance
 */
export interface StatusInstance extends Model<StatusDTO>, StatusDTO {}

/**
 * Status model initialization
 */
export default class Status extends Model<StatusInstance, StatusDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<Status> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        token: {
          type: DataTypes.STRING,
          allowNull: true
        },
        project_id: {
          type: DataTypes.STRING,
          allowNull: true
        }
      },
      { 
        sequelize,
        tableName: 'Statuses'
      }
    );
  }

  static associate(models: any) {
    // Define associations here
  }

  static hooks(models: any, sequelize: Sequelize) {
    // Define hooks here
  }
}