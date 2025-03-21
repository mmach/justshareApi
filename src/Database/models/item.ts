'use strict';

import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";

/**
 * Interface for Item attributes
 */
export interface ItemDTO {
  id: string;
  name?: string;
  description?: string;
  user_id?: string;
  blob_id?: string;
  category_id?: string;
  clobSearch_pl?: string;
  clobSearch_us?: string;
  clobSearch_de?: string;
  clobSearch_fr?: string;
  clobSearch_ru?: string;
  clobSearch_no?: string;
  clobSearch_es?: string;
  clobSearch_zh_cn?: string;
  process_id?: string;
  process_chain_id?: string;
  process_updated_date?: Date;
  longitude?: number;
  latitude?: number;
  category_type?: number;
  is_elastic_sync?: boolean;
  expired_date?: Date;
  project_id?: string;
  es_operations?: string;
  external_id?: string;
  item_process_id?: string;
}

/**
 * Interface for Item instance
 */
export interface ItemInstance extends Model<ItemDTO>, ItemDTO {}

/**
 * Item model initialization
 */
export default class Item extends Model<ItemInstance, ItemDTO> {
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