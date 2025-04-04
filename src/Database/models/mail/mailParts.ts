'use strict';

import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";
import { MailPartsDTO } from "../../../Models/mail";
/**
 * Interface for MailParts instance
 */
export interface MailPartsInstance extends Model<MailPartsDTO>, MailPartsDTO {}

/**
 * MailParts model initialization
 */
export default class MailParts extends Model<MailPartsInstance, MailPartsDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<MailParts> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        project_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        name: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        type: {
          type: DataTypes.STRING,
          allowNull: true
        },
        body: {
          type: DataTypes.TEXT,
          allowNull: true
        }
      },
      { 
        sequelize,
        tableName: 'MailParts'
      }
    );
  }

  static associate(models: any) {
    // Define associations here
  }
}