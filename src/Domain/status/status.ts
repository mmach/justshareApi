'use strict';

import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { StatusDBO } from "../../DBO/status";
/**
 * Interface for Status instance
 */
interface StatusInstance extends Model<StatusDBO>, StatusDBO {}

/**
 * Status model initialization
 */
export class Status extends Model<StatusInstance, StatusDBO> {
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