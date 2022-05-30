"use strict";
import { Model } from "sequelize";
import uuidv4 from "uuid/v4";



/**
 *
 * @export
 * @class Item
 * @extends Sequelize.Model
 */
export default class ItemTransaction extends Model {
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
          allowNull: true
        },
        category_id: {
          type: DataTypes.UUID,
          allowNull: false
        },
        iua_id: {
          type: DataTypes.UUID,
          allowNull: false
        },
        parent_iua_id: {
          type: DataTypes.UUID,
          allowNull: false
        },
        item_id: {
          type: DataTypes.UUID,
          allowNull: false
        },
        longitude: DataTypes.FLOAT,
        latitude: DataTypes.FLOAT,
        category_type: DataTypes.INTEGER,
        expired_date: DataTypes.DATEONLY,
        status: DataTypes.INTEGER,
        project_id: {
          type: DataTypes.UUID,
          allowNull: false
        },
        external_id: DataTypes.STRING,
      },
      { sequelize,
        tableName: 'ItemTransactions'
      }
    );
  }
  static hooks(models) {

  

  }
  static associate(models) {

    ItemTransaction.belongsTo(models.Category, {
      as: "category",
      targetKey: "id",
      foreignKey: "category_id"
    });
    ItemTransaction.belongsTo(models.Project, {
      as: "project",
      targetKey: "id",
      foreignKey: "project_id"
    });
    ItemTransaction.belongsTo(models.ItemUserAction, {
      as: "iua_main",
      targetKey: "id",
      foreignKey: "parent_iua_id"
    });
    
    ItemTransaction.hasMany(models.Blob, {
      as: "blobs",
      targetKey: "item_id",
      foreignKey: "item_id"
    });
    ItemTransaction.belongsTo(models.V_User, {
      as: "user",
      targetKey: "id",
      foreignKey: "user_id"
    });
    ItemTransaction.hasMany(models.ItemTransactionCategoryOptions, {
      as: "itemCategoryOption",
      targetKey: "id",
      foreignKey: "itemTransaction_id"
    });
    
    ItemTransaction.belongsToMany(models.Tag, {
      through: { model: models.ItemTag },
      as: 'tags',
      targetKey: 'id',
      foreignKey: "item_id"
    });
  }
}
