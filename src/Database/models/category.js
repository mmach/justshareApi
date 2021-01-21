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
        /*category: {
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
       category_zh_cn: DataTypes.STRING,*/
        status: DataTypes.INTEGER,
        forThing: {
          field: 'forThing',
          type: DataTypes.INTEGER
        },
        forSell: {
          field: 'forSell',
          type: DataTypes.INTEGER
        },
        forEvent: {
          field: 'forEvent',
          type: DataTypes.INTEGER
        },
        view_type: DataTypes.STRING,


        // icon: DataTypes.STRING,
        expired_day: DataTypes.INTEGER,
        project_id: DataTypes.UUID,
        blob_id: DataTypes.UUID,
        color: DataTypes.STRING,
        translation_id: DataTypes.UUID,
        process_id: DataTypes.UUID,    
        params: DataTypes.STRING,
        preview_desktop: DataTypes.STRING,
        preview_mobile: DataTypes.STRING,
        is_root: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },



      },
      { sequelize }
    );
  }


  static hooks(models, sequelize) {


    Category.beforeDestroy(async (item, options) => {

      console.log('beforeDestroy')


      await models.CategoryHierarchy.destroy({
        where: { category_parent_id: item.id },
        transaction: options.transaction,
        individualHooks: true

      })

      await models.CategoryHierarchy.destroy({
        where: { category_child_id: item.id },
        transaction: options.transaction,
        individualHooks: true

      })
      await models.Item.destroy({
        where: { category_id: item.id },
        transaction: options.transaction,
        individualHooks: true,
      })

      await models.CategoryOptionsLink.destroy({
        where: { category_id: item.id },
        transaction: options.transaction,
        individualHooks: true,
      })

      await models.Blob.destroy({
        where: { category_id: item.id },
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
    Category.hasMany(models.CategoryActions, { as: "actions", targetKey: 'id', foreignKey: "category_id" });

    Category.belongsToMany(models.Category, {
      through: { model: models.CategoryHierarchy },
      as: 'category_parent',
      targetKey: 'id',
      foreignKey: "category_child_id"
    });

    Category.belongsTo(models.Translations, { as: "translation", targetKey: 'id', foreignKey: "translation_id" });

  }
}

