'use strict';

import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";
import { TranslationsDTO } from "../../../Models/translations";



/**
 * Interface for Translations instance
 */
export interface TranslationsInstance extends Model<TranslationsDTO>, TranslationsDTO {}

/**
 * Translations model initialization
 */
export default class Translations extends Model<TranslationsInstance, TranslationsDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<Translations> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        name: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        pl: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        us: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        no: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        de: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        zh_cn: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        fr: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        es: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        ru: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        project_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        token: {
          type: DataTypes.STRING,
          allowNull: true
        },
        respStatus: {
          type: DataTypes.STRING,
          allowNull: true
        },
        type: {
          type: DataTypes.STRING,
          allowNull: true
        }
      },
      { 
        sequelize,
        tableName: 'Translations'
      }
    );
  }

  static associate(models: any) {
    // Define associations here
  }
}