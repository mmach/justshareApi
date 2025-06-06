'use strict';

import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";
import { DimensionsDBO } from "../../DBO/dimensions";
/**
 * Interface for Dimensions instance
 */
interface DimensionsInstance extends Model<DimensionsDBO>, DimensionsDBO { }

/**
 * Dimensions model initialization
 */
export class Dimensions extends Model<DimensionsInstance, DimensionsDBO> {
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