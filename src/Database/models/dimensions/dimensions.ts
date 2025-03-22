'use strict';

import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";

/**
 * Interface for Dimensions attributes
 */
export interface DimensionsDTO {
  id: string;
  name?: string;
  uniq_name?: string;
  description?: string;
  co_type_id?: string;
  cott_id?: string;
  as_cat_ref?: boolean;
  project_id?: string;
}

/**
 * Interface for Dimensions instance
 */
export interface DimensionsInstance extends Model<DimensionsDTO>, DimensionsDTO { }

/**
 * Dimensions model initialization
 */
export default class Dimensions extends Model<DimensionsInstance, DimensionsDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<Dimensions> {
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
        uniq_name: {
          type: DataTypes.STRING,
          allowNull: true
        },
        description: {
          type: DataTypes.STRING,
          allowNull: true
        },
        co_type_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        cott_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        as_cat_ref: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        project_id: {
          type: DataTypes.STRING,
          allowNull: true
        }
      },
      {
        sequelize,
        tableName: 'Dimensions'
      }
    );
  }

  static hooks(models: any, sequelize: Sequelize) {
    Dimensions.beforeDestroy(async (item: any, options) => {
      await models.DimensionsProject.destroy({
        where: { dimension_id: item.id },
        transaction: options.transaction,
        individualHooks: true
      });
    });
  }

  static associate(models: any) {
    // Define associations here
  }
}