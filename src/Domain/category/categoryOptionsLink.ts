'use strict';

import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { CategoryOptionsLinkDBO } from "../../DBO/category";


/**
 * Interface for CategoryOptionsLink instance
 */
interface CategoryOptionsLinkInstance extends Model<CategoryOptionsLinkDBO>, CategoryOptionsLinkDBO {}

/**
 * CategoryOptionsLink model initialization
 */
export class CategoryOptionsLink extends Model<CategoryOptionsLinkInstance, CategoryOptionsLinkDBO> {
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