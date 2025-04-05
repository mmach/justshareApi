'use strict';

import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { ItemDBO } from "../../DBO/item";

/**
 * Interface for Item instance
 */
interface ItemInstance extends Model<ItemDBO>, ItemDBO {}

/**
 * Item model initialization
 */
export class Item extends Model<ItemInstance, ItemDBO> {
  static initModel(sequelize: Sequelize): ModelStatic<Item> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
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
          allowNull: true
        },
        category_id: {
          type: DataTypes.UUID,
          allowNull: false
        },
        clobSearch_pl: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        clobSearch_us: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        clobSearch_de: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        clobSearch_fr: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        clobSearch_ru: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        clobSearch_no: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        clobSearch_es: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        clobSearch_zh_cn: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        process_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        process_chain_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        process_updated_date: {
          type: DataTypes.DATE,
          allowNull: true
        },
        longitude: {
          type: DataTypes.FLOAT,
          allowNull: true
        },
        latitude: {
          type: DataTypes.FLOAT,
          allowNull: true
        },
        category_type: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        is_elastic_sync: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        expired_date: {
          type: DataTypes.DATEONLY,
          allowNull: true
        },
        project_id: {
          type: DataTypes.UUID,
          allowNull: false
        },
        es_operations: {
          type: DataTypes.STRING,
          allowNull: true
        },
        external_id: {
          type: DataTypes.STRING,
          allowNull: true
        },
        item_process_id: {
          type: DataTypes.UUID,
          allowNull: true
        }
      },
      { 
        sequelize,
        tableName: 'Items'
      }
    );
  }

  static hooks(models: any) {
    Item.afterUpdate(async (item:any, options) => {
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
    Item.afterCreate(async (item:any, options) => {
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

    Item.beforeDestroy(async (item:any, options) => {
      await models.ItemCategoryOption.destroy({
        where: { item_id: item.id },
        transaction: options.transaction,
        individualHooks: true
      });

      await models.Blob.destroy({
        where: { item_id: item.id },
        transaction: options.transaction,
        individualHooks: true
      });

      await models.ItemTag.destroy({
        where: { item_id: item.id },
        transaction: options.transaction,
        individualHooks: true
      });

      await models.EsItemSync.create({
        id: uuidv4(),
        item_id: item.id,
        project_id: '',
        operation: 'D'
      },
      {
        transaction: options.transaction,
      });
    });
  }

  static associate(models: any) {
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
      foreignKey: "item_id"
    });
    Item.belongsTo(models.V_User, {
      as: "user",
      foreignKey: "user_id"
    });
    Item.hasMany(models.ItemCategoryOption, {
      as: "itemCategoryOption",
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
      foreignKey: "item_id"
    });
  }
}