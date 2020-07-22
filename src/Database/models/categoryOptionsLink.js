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
        is_on_pin_map: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        is_on_map: {
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
    CategoryOptionsLink.afterUpsert(async (item, options) => {
      console.log('afterUpdate')
      console.log(item)
      console.log(item[0].dataValues.category_id)
      let results = await sequelize.query(
        `
       
         WITH recus(category_id) AS (
          SELECT category_child_id FROM CategoryHierarchies
          WHERE Category_parent_id IN (:category_id)
          UNION ALL
          SELECT CategoryHierarchies.category_child_id  FROM recus JOIN CategoryHierarchies ON Category_parent_id=recus.category_id
          ),
          union_recus AS (
          SELECT category_id FROM recus
          UNION 
          SELECT :category_id
          )
          SELECT  Items.id, Items.project_id  FROM union_recus 
          JOIN Items ON Items.category_id = union_recus.category_id 
          
      `,
        {
          replacements: { category_id: item[0].dataValues.category_id, project_id: item.project_id },
          transaction: options.transaction,
          type: sequelize.QueryTypes.SELECT
        }
      );

      console.log(results);

      await Promise.all(results.map(el => {
        return models.EsItemSync.create({
          id: uuidv4(),
          item_id: el.id,
          project_id: el.project_id,
          operation: 'U'
        },
          {
            transaction: options.transaction,
          }
        );

      })
      );

    });



  }
  static associate(models) {
    CategoryOptionsLink.belongsTo(models.V_Category, { as: "category", targetKey: 'id', foreignKey: "category_id" });
    CategoryOptionsLink.belongsTo(models.CategoryOption, { as: "catOption", targetKey: 'id', foreignKey: "co_id" });


  }
}
