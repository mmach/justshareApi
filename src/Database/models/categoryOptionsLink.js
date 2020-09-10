"use strict";
import { Model } from "sequelize";
import uuidv4 from "uuid/v4";

/**
 *
 * @export
 * @class Item
 * @extends Sequelize.Model
 */
export default class CategoryOptionsLink extends Model {
  /**
   *
   * @static
   * @param  {any} sequelize
   * @param  {any} DataTypes
   * @return {Region|Model}
   * @memberof CategoryOption
   */
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: sequelize.UUIDV4

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
        }, order: {
          type: DataTypes.INTEGER,
          allowNull: true
        }, is_searchable: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        }, limit_of: {
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
      },
      { sequelize }
    );
  }

  static hooks(models, sequelize) {
    CategoryOptionsLink.beforeDestroy(async (item, options) => {

      console.log('beforeDestroy')

      await models.ItemCategoryOption.destroy({
        where: { col_id: item.id },
        transaction: options.transaction,
        individualHooks: true,
      })


    })
  


  }
  static associate(models) {
    CategoryOptionsLink.belongsTo(models.V_Category, { as: "category", targetKey: 'id', foreignKey: "category_id" });
    CategoryOptionsLink.belongsTo(models.CategoryOption, { as: "catOption", targetKey: 'id', foreignKey: "co_id" });


  }
}
