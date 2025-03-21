'use strict';

import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";

/**
 * Interface for Language attributes
 */
export interface LanguageDTO {
  id: string;
  name?: string;
  code?: string;
  project_id?: string;
}

/**
 * Interface for Language instance
 */
export interface LanguageInstance extends Model<LanguageDTO>, LanguageDTO {}

/**
 * Language model initialization
 */
export default class Language extends Model<LanguageInstance, LanguageDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<Language> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        name: {
          type: DataTypes.STRING,
          allowNull: true
        },
        code: {
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
        tableName: 'Languages'
      }
    );
  }

  static associate(models: any) {
    // Define associations here
  }
}