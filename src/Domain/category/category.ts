'use strict';

import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { CategoryDBO } from "../../DBO/category";


/**
 * Interface for Category instance
 */
interface CategoryInstance extends Model<CategoryDBO>, CategoryDBO { }

/**
 * Category model initialization
 */
export class Category extends Model<CategoryInstance, CategoryDBO> {
  static initModel(sequelize: Sequelize): ModelStatic<Category> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        status: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        forThing: {
          field: 'forThing',
          type: DataTypes.INTEGER,
          allowNull: true
        },
        forSell: {
          field: 'forSell',
          type: DataTypes.INTEGER,
          allowNull: true
        },
        forEvent: {
          field: 'forEvent',
          type: DataTypes.INTEGER,
          allowNull: true
        },
        view_type: {
          type: DataTypes.STRING,
          allowNull: true
        },
        expired_day: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        project_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        blob_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        color: {
          type: DataTypes.STRING,
          allowNull: true
        },
        translation_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        process_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        is_root: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        cms_preview: {
          type: DataTypes.STRING,
          allowNull: true
        },
        cms_create: {
          type: DataTypes.STRING,
          allowNull: true
        },
        cms_edit: {
          type: DataTypes.STRING,
          allowNull: true
        },
        cms_search: {
          type: DataTypes.STRING,
          allowNull: true
        }
      },
      {
        sequelize,
        tableName: 'Categories'
      }
    );
  }

  static hooks(models: any, sequelize: Sequelize) {
    console.log('categories hooks');

    Category.beforeDestroy(async (item: any, options) => {
      console.log('beforeDestroy');

      await models.CategoryHierarchy.destroy({
        where: { category_parent_id: item.id },
        transaction: options.transaction,
        individualHooks: true
      });

      await models.CategoryHierarchy.destroy({
        where: { category_child_id: item.id },
        transaction: options.transaction,
        individualHooks: true
      });

      await models.Item.destroy({
        where: { category_id: item.id },
        transaction: options.transaction,
        individualHooks: true
      });

      await models.CategoryOptionsLink.destroy({
        where: { category_id: item.id },
        transaction: options.transaction,
        individualHooks: true
      });

      await models.Blob.destroy({
        where: { category_id: item.id },
        transaction: options.transaction,
        individualHooks: true
      });
    });
  }

  static associate(models: any) {
    Category.belongsToMany(models.Category, {
      through: { model: models.CategoryHierarchy },
      as: 'category_children',
      targetKey: 'id',
      foreignKey: "category_parent_id"
    });

    Category.belongsTo(models.Blob, { as: "icon_blob", targetKey: 'id', foreignKey: "blob_id" });
    Category.hasMany(models.CategoryActions, { as: "actions", foreignKey: "category_id" });

    Category.belongsToMany(models.Category, {
      through: { model: models.CategoryHierarchy },
      as: 'category_parent',
      targetKey: 'id',
      foreignKey: "category_child_id"
    });

    Category.belongsTo(models.Translations, { as: "translation", targetKey: 'id', foreignKey: "translation_id" });
  }
}