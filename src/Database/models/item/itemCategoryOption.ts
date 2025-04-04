'use strict';

import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { ItemCategoryOptionDTO } from "../../../Models/item";
/**
 * Interface for ItemCategoryOption instance
 */
export interface ItemCategoryOptionInstance extends Model<ItemCategoryOptionDTO>, ItemCategoryOptionDTO { }

/**
 * ItemCategoryOption model initialization
 */
export default class ItemCategoryOption extends Model<ItemCategoryOptionInstance, ItemCategoryOptionDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<ItemCategoryOption> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        item_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        col_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        co_temp_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        value: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        status: {
          type: DataTypes.STRING,
          allowNull: true
        },
        iua_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        dim_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        project_id: {
          type: DataTypes.UUID,
          allowNull: true
        }
      },
      {
        sequelize,
        tableName: 'ItemCategoryOptions'
      }
    );
  }

  static associate(models: any) {
    ItemCategoryOption.belongsTo(models.CategoryOptionsLink, {
      as: "category_link",
      targetKey: "id",
      foreignKey: "col_id"
    });
    ItemCategoryOption.belongsTo(models.CategoryOptionsTemplate, {
      as: "cat_opt_temp",
      targetKey: "id",
      foreignKey: "co_temp_id"
    });
  }
}