'use strict';

import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";
import { TranslationsDTO } from "../translations/translations";
import { StatusDTO } from "./status";

/**
 * Interface for StatusProjects attributes
 */
export interface StatusProjectsDTO {
  id: string;
  is_closed?: string;
  translation_id?: string;
  project_id?: string;
  status_id?: string;
  status_order?: string;

  translation?: TranslationsDTO;
  status?: StatusDTO;
}

/**
 * Interface for StatusProjects instance
 */
export interface StatusProjectsInstance extends Model<StatusProjectsDTO>, StatusProjectsDTO { }

/**
 * StatusProjects model initialization
 */
export default class StatusProjects extends Model<StatusProjectsInstance, StatusProjectsDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<StatusProjects> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        is_closed: {
          type: DataTypes.UUID,
          allowNull: true
        },
        translation_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        project_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        status_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        status_order: {
          type: DataTypes.UUID,
          allowNull: true
        }
      },
      {
        sequelize,
        tableName: 'StatusProjects'
      }
    );
  }

  static associate(models: any) {
    StatusProjects.belongsTo(models.Translations, { as: "translation", targetKey: 'id', foreignKey: "translation_id" });
    StatusProjects.belongsTo(models.Status, { as: "status", targetKey: 'id', foreignKey: "status_id" });
  }

  static hooks(models: any, sequelize: Sequelize) {
    StatusProjects.afterDestroy(async (item: any, options) => {
      await models.Translations.destroy({
        where: { id: item.translation_id },
        transaction: options.transaction,
        individualHooks: true
      });
    });
  }
}