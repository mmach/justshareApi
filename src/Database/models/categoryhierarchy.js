'use strict';
import { Model } from 'sequelize';
import {v4} from "uuid";

/**
 * 
 * @export
 * @class CategoryHierarchy
 * @extends Sequelize.Model
 */
export default class CategoryHierarchy extends Model {

  /**
   * 
   * @static
   * @param  {any} sequelize 
   * @param  {any} DataTypes 
   * @return {CategoryHierarchy|Model}
   * @memberof Users
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
        category_child_id: DataTypes.UUID,
        category_parent_id: DataTypes.UUID
      },
      { sequelize,
        tableName: 'CategoryHierarchies'
      }
    );
  }

  static hooks(models, sequelize) {

    CategoryHierarchy.afterCreate(async (item, options) => {
      console.log('afterCreate')
      console.log(item.dataValues.category_child_id)
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
          replacements: { category_id: item.dataValues.category_child_id },
          transaction: options.transaction,
          type: sequelize.QueryTypes.SELECT
        }
      );

      console.log(results);
      await Promise.all(results.map(el => {
        return models.EsItemSync.create({
          id: v4(),
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
    //  CategoryHierarchy.belongsTo(models.Category, { as: "category_parent", targetKey: 'id', foreignKey: "category_parent_id" });
    // CategoryHierarchy.belongsTo(models.Category, { as: "category_children", targetKey: 'id', foreignKey: "category_child_id" });

    // CategoryHierarchy.hasMany(models.Category, { as: "category_children", targetKey: 'category_child_id', foreignKey: "id" });
  }
}





