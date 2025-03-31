'use strict';

import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";
import { CategoryOptionsTemplateDTO } from "../../../Dto";
import { CategoryOptionsLinkDTO } from "../category/categoryOptionsLink";

/**
 * Interface for ItemTransactionCategoryOptions attributes
 */
export interface ItemTransactionCategoryOptionsDTO {
  id: string;
  item_id?: string;
  ico_id?: string;
  itemTransaction_id?: string;
  col_id?: string;
  co_temp_id?: string;
  value?: string;
  status?: string;
  iua_id?: string;
  dim_id?: string;

  category_link?: CategoryOptionsLinkDTO;
  cat_opt_temp?: CategoryOptionsTemplateDTO;
}

/**
 * Interface for ItemTransactionCategoryOptions instance
 */
export interface ItemTransactionCategoryOptionsInstance extends Model<ItemTransactionCategoryOptionsDTO>, ItemTransactionCategoryOptionsDTO {}

/**
 * ItemTransactionCategoryOptions model initialization
 */
export default class ItemTransactionCategoryOptions extends Model<ItemTransactionCategoryOptionsInstance, ItemTransactionCategoryOptionsDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<ItemTransactionCategoryOptions> {
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
        ico_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        itemTransaction_id: {
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
        }
      },
      { 
        sequelize,
        tableName: 'ItemTransactionCategoryOptions'
      }
    );
  }

  static associate(models: any) {
    ItemTransactionCategoryOptions.belongsTo(models.CategoryOptionsLink, {
      as: "category_link",
      targetKey: "id",
      foreignKey: "col_id"
    });
    ItemTransactionCategoryOptions.belongsTo(models.CategoryOptionsTemplate, {
      as: "cat_opt_temp",
      targetKey: "id",
      foreignKey: "co_temp_id"
    });
  }
}