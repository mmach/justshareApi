'use strict';

import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { DimensionsProjectDTO } from "../../../Models/dimensions";

/**
 * Interface for DimensionsProject instance
 */
export interface DimensionsProjectInstance extends Model<DimensionsProjectDTO>, DimensionsProjectDTO {}

/**
 * DimensionsProject model initialization
 */
export default class DimensionsProject extends Model<DimensionsProjectInstance, DimensionsProjectDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<DimensionsProject> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        dimension_id: {
          type: DataTypes.STRING,
          allowNull: true
        },
        project_id: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        translation_id: {
          type: DataTypes.STRING,
          allowNull: true
        }
      },
      { 
        sequelize,
        tableName: 'DimensionsProjects'
      }
    );
  }

  static associate(models: any) {
    DimensionsProject.belongsTo(models.Dimensions, { as: "dimension_details", targetKey: 'id', foreignKey: "dimension_id" });
    DimensionsProject.belongsTo(models.Translations, { as: "translation", targetKey: 'id', foreignKey: "translation_id" });
  }

  static hooks(models: any, sequelize: Sequelize) {
    DimensionsProject.afterDestroy(async (item:any, options) => {
      await models.Translations.destroy({
        where: { id: item.translation_id },
        transaction: options.transaction,
        individualHooks: true
      });
    });
  }
}