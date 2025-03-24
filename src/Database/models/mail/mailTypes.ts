'use strict';

import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";

/**
 * Interface for MailTypes attributes
 */
export interface MailTypesDTO {
  id: string;
  token?: string;
  description?: string;
  bodyPayload?: string;
  templatePayload?: string;
  body?: string;
  templateBody?: string;
}

/**
 * Interface for MailTypes instance
 */
export interface MailTypesInstance extends Model<MailTypesDTO>, MailTypesDTO {}

/**
 * MailTypes model initialization
 */
export default class MailTypes extends Model<MailTypesInstance, MailTypesDTO> {
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