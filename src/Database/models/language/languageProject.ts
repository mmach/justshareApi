'use strict';

import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";
import { LanguageDTO } from "./language";

/**
 * Interface for LanguageProject attributes
 */
export interface LanguageProjectDTO {
  id: string;
  language_id?: string;
  project_id?: string;
  status?: boolean;
  is_main?: boolean;

  lang_details?: LanguageDTO;
}

/**
 * Interface for LanguageProject instance
 */
export interface LanguageProjectInstance extends Model<LanguageProjectDTO>, LanguageProjectDTO {}

/**
 * LanguageProject model initialization
 */
export default class LanguageProject extends Model<LanguageProjectInstance, LanguageProjectDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<LanguageProject> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        language_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        project_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        status: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        is_main: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        }
      },
      { 
        sequelize,
        tableName: 'LanguageProjects'
      }
    );
  }

  static associate(models: any) {
    LanguageProject.belongsTo(models.Language, { as: "lang_details", targetKey: 'id', foreignKey: "language_id" });
  }
}