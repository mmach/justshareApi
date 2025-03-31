'use strict';

import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";
import { V_CategoryDTO } from "./v_category";
import { CategoryOptionAttributesDTO } from "./categoryOption";

/**
 * Interface for CategoryOptionsLink attributes
 */
export interface CategoryOptionsLinkDTO {
  id: string;
  co_id?: string;
  category_id?: string;
  is_require?: boolean;
  order?: number;
  is_searchable?: boolean;
  limit_of?: number;
  order_search?: number;
  is_on_pin_map?: boolean;
  is_on_map?: boolean;
  is_on_iua?: boolean;
  is_on_main_page?: boolean;
  is_on_iua_request?: boolean;
  is_params?: boolean;
  is_form_hidden?: boolean;
  search_label?: string;
  search_type?: string;
  show_value?: string;
  can_above_pin?: boolean;
  is_visible_view?: boolean;
  project_id?: string;
  is_form_rendered?: boolean;
  search_params?: string;
  preview_params?: string;
  create_params?: string;

  category?: V_CategoryDTO;
  catOption?: CategoryOptionAttributesDTO;
}


/**
 * Interface for CategoryOptionsLink instance
 */
export interface CategoryOptionsLinkInstance extends Model<CategoryOptionsLinkDTO>, CategoryOptionsLinkDTO {}

/**
 * CategoryOptionsLink model initialization
 */
export default class CategoryOptionsLink extends Model<CategoryOptionsLinkInstance, CategoryOptionsLinkDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<CategoryOptionsLink> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        co_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        category_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        is_require: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        order: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        is_searchable: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        limit_of: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        order_search: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        is_on_pin_map: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        is_on_map: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        is_on_iua: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        is_on_main_page: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        is_on_iua_request: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        is_params: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        is_form_hidden: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        search_label: {
          type: DataTypes.STRING,
          allowNull: true
        },
        search_type: {
          type: DataTypes.STRING,
          allowNull: true
        },
        show_value: {
          type: DataTypes.STRING,
          allowNull: true
        },
        can_above_pin: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        is_visible_view: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        project_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        is_form_rendered: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        search_params: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        preview_params: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        create_params: {
          type: DataTypes.TEXT,
          allowNull: true
        }
      },
      { 
        sequelize,
        tableName: 'CategoryOptionsLinks'
      }
    );
  }

  static hooks(models: any, sequelize: Sequelize) {
    CategoryOptionsLink.beforeDestroy(async (item:any, options) => {
      console.log('beforeDestroy');

      await models.ItemCategoryOption.destroy({
        where: { col_id: item.id },
        transaction: options.transaction,
        individualHooks: true,
      });
    });
  }

  static associate(models: any) {
    CategoryOptionsLink.belongsTo(models.V_Category, { as: "category", targetKey: 'id', foreignKey: "category_id" });
    CategoryOptionsLink.belongsTo(models.CategoryOption, { as: "catOption", targetKey: 'id', foreignKey: "co_id" });
  }
}