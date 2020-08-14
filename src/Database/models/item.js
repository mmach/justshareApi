"use strict";
import { Model } from "sequelize";
import uuidv4 from "uuid/v4";



/**
 *
 * @export
 * @class Item
 * @extends Sequelize.Model
 */
export default class Item extends Model {
  /**
   *
   * @static
   * @param  {any} sequelize
   * @param  {any} DataTypes
   * @return {Item|Model}
   * @memberof Item
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
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        description: {
          type: DataTypes.STRING(1024),
          allowNull: false
        },
        user_id: {
          type: DataTypes.UUID,
          allowNull: false
        },
        blob_id: {
          type: DataTypes.UUID,
          allowNull: false
        },
        category_id: {
          type: DataTypes.UUID,
          allowNull: false
        },
        clobSearch_pl: DataTypes.TEXT,
        clobSearch_us: DataTypes.TEXT,
        clobSearch_de: DataTypes.TEXT,
        clobSearch_fr: DataTypes.TEXT,
        clobSearch_ru: DataTypes.TEXT,
        clobSearch_no: DataTypes.TEXT,
        clobSearch_es: DataTypes.TEXT,
        clobSearch_zh_cn: DataTypes.TEXT,
        longitude: DataTypes.FLOAT,
        latitude: DataTypes.FLOAT,
        category_type: DataTypes.INTEGER,
        is_elastic_sync: DataTypes.BOOLEAN,
        expired_date: DataTypes.DATEONLY,
        project_id: {
          type: DataTypes.UUID,
          allowNull: false
        },
        es_operations: DataTypes.STRING,
        external_id: DataTypes.STRING,
      },
      { sequelize }
    );
  }
  static hooks(models) {

    Item.afterUpsert(async (item, options) => {

      await models.EsItemSync.create({
        id: uuidv4(),
        item_id: item[0].dataValues.id,
        project_id: item[0].dataValues.project_id,
        operation: 'I'
      },
        {
          transaction: options.transaction,
        });
    });
    Item.beforeDestroy(async (item, options) => {

      console.log('beforeDestroyItem')
      console.log(item)


      await models.ItemCategoryOption.destroy({
        where: { item_id: item.id },
        transaction: options.transaction,
        individualHooks: true
      })

     
      await models.Blob.destroy({
        where: { item_id: item.id },
        transaction: options.transaction,
        individualHooks: true

      })
      await models.ItemTag.destroy({
        where: { item_id: item.id },
        transaction: options.transaction,
        individualHooks: true

      })

      await models.EsItemSync.create({
        id: uuidv4(),
        item_id: item.id,
        project_id: '',
        operation: 'D'
      },
        {
          transaction: options.transaction,
        });
    })

  }
  static associate(models) {

    Item.belongsTo(models.Category, {
      as: "category",
      targetKey: "id",
      foreignKey: "category_id"
    });
    Item.belongsTo(models.Project, {
      as: "project",
      targetKey: "id",
      foreignKey: "project_id"
    });
    Item.hasMany(models.Blob, {
      as: "blobs",
      targetKey: "id",
      foreignKey: "item_id"
    });
    Item.belongsTo(models.V_User, {
      as: "user",
      targetKey: "id",
      foreignKey: "user_id"
    });
    Item.hasMany(models.ItemCategoryOption, {
      as: "itemCategoryOption",
      targetKey: "id",
      foreignKey: "item_id"
    });
    Item.belongsToMany(models.Tag, {
      through: { model: models.ItemTag },
      as: 'tags',
      targetKey: 'id',
      foreignKey: "item_id"
    });

    Item.hasMany(models.ItemCategoryOptionTerm, {
      as: 'itemCategoryOptionTerms',
      targetKey: 'id',
      foreignKey: "item_id"
    });
   
  }
}
