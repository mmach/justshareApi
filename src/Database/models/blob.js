
'use strict';
import { Model } from 'sequelize';
import v4 from "uuid";

/**
 * 
 * @export
 * @class Blob
 * @extends Sequelize.Model
 */
export default class Blob extends Model {

  /**
   * 
   * @static
   * @param  {any} sequelize 
   * @param  {any} DataTypes 
   * @return {Blob|Model}
   * @memberof Blob
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
        blob_id: DataTypes.UUID,
        item_id: DataTypes.UUID,
        blob_thumbmail_id: DataTypes.UUID,
        blob_min_id: DataTypes.UUID,

        user_id: {
          type: DataTypes.UUID
        },
        order: DataTypes.INTEGER,
        status: DataTypes.INTEGER,
        category_id: {
          type: DataTypes.UUID
        },
        project_id: {
          type: DataTypes.UUID
        }
      },
      { sequelize }
    );
  }



  static hooks(models, sequelize) {

    console.log('bloobs hooks')

    Blob.afterUpdate(async (item, options) => {

      console.log('afterUpdate')
      if (item.item_id) {
        models.EsItemSync.create({
          id: v4(),
          item_id: item.item_id,
          operation: 'U'
        },
          {
            transaction: options.transaction,
          }
        );
      }
      return;



    })
  }
  static associate(models) {
    Blob.belongsTo(models.BlobMapper, { as: "blob_item", targetKey: 'id', foreignKey: "blob_id" });
    Blob.belongsTo(models.BlobMapper, { as: "blob_thumbmail", targetKey: 'id', foreignKey: "blob_thumbmail_id" });
    Blob.belongsTo(models.BlobMapper, { as: "blob_min", targetKey: 'id', foreignKey: "blob_min_id" });

  }
}


