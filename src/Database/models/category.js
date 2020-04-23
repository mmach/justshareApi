'use strict';
import { Model } from 'sequelize';
import uuidv4 from "uuid/v4";

/**
 * 
 * @export
 * @class Category
 * @extends Sequelize.Model
 */
export default class Category extends Model {

  /**
   * 
   * @static
   * @param  {any} sequelize 
   * @param  {any} DataTypes 
   * @return {Category|Model}
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
        category: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        category_pl: DataTypes.STRING,
        category_us: DataTypes.STRING,
        category_de: DataTypes.STRING,
        category_ru: DataTypes.STRING,
        category_fr: DataTypes.STRING,
        category_es: DataTypes.STRING,
        category_no: DataTypes.STRING,
        category_zh_cn: DataTypes.STRING,
        status: DataTypes.INTEGER,
        forThing: DataTypes.INTEGER,
        forSell: DataTypes.INTEGER,
        forEvent: DataTypes.INTEGER,
        icon: DataTypes.STRING,
        expired_day: DataTypes.INTEGER,
        project_id: DataTypes.UUID,
        blob_id: DataTypes.UUID



      },
      { sequelize }
    );
  }


  static hooks(models, sequelize) {

    Category.afterUpdate(async (item, options) => {

      console.log('afterUpdate')
      console.log(item)
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
          replacements: { category_id: item.id, project_id: item.project_id },
          transaction: options.transaction,
          type: sequelize.QueryTypes.SELECT
        }
      );


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
    })


    Category.beforeDestroy(async (item, options) => {

      console.log('beforeDestroy')
      console.log(item)
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
          SELECT  category_id FROM union_recus 
          
      `,
        {
          replacements: { category_id: item.id, project_id: item.project_id },
          transaction: options.transaction,
          type: sequelize.QueryTypes.SELECT
        }
      );

      await models.CategoryHierarchy.destroy({
        where: { category_parent_id: results.map(item => { return item.category_id }) },
        transaction: options.transaction,
        individualHooks: true

      })

      await models.CategoryHierarchy.destroy({
        where: { category_child_id: results.map(item => { return item.category_id }) },
        transaction: options.transaction,
        individualHooks: true

      })
      await models.Item.destroy({
        where: { category_id: results.map(item => { return item.category_id }) },
        transaction: options.transaction,
        individualHooks: true,
      })

      await models.CategoryOptionsLink.destroy({
        where: { category_id: results.map(item => { return item.category_id }) },
        transaction: options.transaction,
        individualHooks: true,
      })

        await models.Blob.destroy({
          where: { category_id: results.map(item=>{return item.category_id})  },
          transaction: options.transaction,
          individualHooks: true,
        })

    })
  }

  static associate(models) {
    //  Category.belongsTo(models.CategoryHierarchy, { as: "category_parent", targetKey: 'category_child_id', foreignKey: "id" });
    Category.belongsToMany(models.Category, {
      through: { model: models.CategoryHierarchy },
      as: 'category_children',
      targetKey: 'id',
      foreignKey: "category_parent_id"
    });

    Category.belongsTo(models.Blob, { as: "icon_blob", targetKey: 'id', foreignKey: "blob_id" });

    Category.belongsToMany(models.Category, {
      through: { model: models.CategoryHierarchy },
      as: 'category_parent',
      targetKey: 'id',
      foreignKey: "category_child_id"
    });
  }
}


/*


module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define('Category', {
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_pl: DataTypes.STRING,
    category_us: DataTypes.STRING
  }, { underscored: true });
  Category.associate = function (models) {

    Category.belongsTo(models.CategoryHierarchy, { as: "category_parent", targetKey: 'category_child_id', foreignKey: "id" });
    Category.belongsToMany(models.Category, {
      through: { model: models.CategoryHierarchy },
      as: 'category_children',
      targetKey: 'id',
      foreignKey: "category_parent_id"
    });
  };

  return Category;
};

*/