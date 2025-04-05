'use strict';

import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { LanguageDBO } from "../../DBO/language";
/**
 * Interface for Language instance
 */
interface LanguageInstance extends Model<LanguageDBO>, LanguageDBO {}

/**
 * Language model initialization
 */
export class Language extends Model<LanguageInstance, LanguageDBO> {
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