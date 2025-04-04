'use strict';

import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { BlobDBO } from "../../DBO/blob";



/**
 * Interface for Blob instance
 */
interface BlobInstance extends Model<BlobDBO>, BlobDBO { }

/**
 * Blob model initialization
 */
export class Blob extends Model<BlobInstance, BlobDBO> {
  static initModel(sequelize: Sequelize): ModelStatic<Blob> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        blob_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        item_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        blob_thumbmail_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        blob_min_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        user_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        order: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        status: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        category_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        project_id: {
          type: DataTypes.UUID,
          allowNull: true
        }
      },
      {
        sequelize,
        tableName: 'Blobs'
      }
    );
  }

  static hooks(models: any, sequelize: Sequelize) {
    console.log('blobs hooks');

    Blob.afterUpdate(async (item: any, options) => {
      console.log('afterUpdate');
      if (item.item_id) {
        models.EsItemSync.create({
          id: uuidv4(),
          item_id: item.item_id,
          operation: 'U'
        },
          {
            transaction: options.transaction,
          });
      }
      return;
    });
  }

  static associate(models: any) {
    Blob.belongsTo(models.BlobMapper, { as: "blob_item", targetKey: 'id', foreignKey: "blob_id" });
    Blob.belongsTo(models.BlobMapper, { as: "blob_thumbmail", targetKey: 'id', foreignKey: "blob_thumbmail_id" });
    Blob.belongsTo(models.BlobMapper, { as: "blob_min", targetKey: 'id', foreignKey: "blob_min_id" });
  }
}