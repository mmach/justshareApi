'use strict';

import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";
import { MailTypesDBO } from "../../DBO/mail";
/**
 * Interface for MailTypes instance
 */
interface MailTypesInstance extends Model<MailTypesDBO>, MailTypesDBO {}

/**
 * MailTypes model initialization
 */
export class MailTypes extends Model<MailTypesInstance, MailTypesDBO> {
  static initModel(sequelize: Sequelize): ModelStatic<MailTypes> {
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
        description: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        bodyPayload: {
          field: 'bodyPayload',
          type: DataTypes.TEXT,
          allowNull: true
        },
        templatePayload: {
          field: 'templatePayload',
          type: DataTypes.TEXT,
          allowNull: true
        },
        body: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        templateBody: {
          field: 'templateBody',
          type: DataTypes.TEXT,
          allowNull: true
        }
      },
      { 
        sequelize,
        tableName: 'MailTypes'
      }
    );
  }

  static associate(models: any) {
    // Define associations here
  }
}