'use strict';

import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";
import { LanguageProjectDBO } from "../../DBO/language";
/**
 * Interface for LanguageProject instance
 */
interface LanguageProjectInstance extends Model<LanguageProjectDBO>, LanguageProjectDBO {}

/**
 * LanguageProject model initialization
 */
export class LanguageProject extends Model<LanguageProjectInstance, LanguageProjectDBO> {
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