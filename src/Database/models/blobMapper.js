


'use strict';
import { Model } from 'sequelize';

/**
 * 
 * @export
 * @class BlobMapper
 * @extends Sequelize.Model
 */
export default class BlobMapper extends Model {

  /**
   * 
   * @static
   * @param  {any} sequelize 
   * @param  {any} DataTypes 
   * @return {BlobMapper|Model}
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

        }
      },
      { sequelize,
        tableName: 'BlobMappers'
      }
    );
  }
  static associate(models) {
    //BlobMapper.belongsTo(models.Blobs, { foreignKey: "blob_thumbmail_id" });
    //BlobMapper.belongsTo(models.Blobs, { foreignKey: "blob_id" })
  }
}
