
'use strict';
import { Model } from 'sequelize';
import uuidv4 from "uuid/v4";

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
          id: uuidv4(),
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

    //  Blob.belongsTo(models.User);
  }
}





/*
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Blob = sequelize.define('Blobs', {
    blob_id: DataTypes.INTEGER,
    item_id: DataTypes.INTEGER,
    blob_id_thumbmail: DataTypes.INTEGER,
    user_id:{
      type: DataTypes.INTEGER
    },
  }, {underscored: true});
  Blob.associate = function(models) {
    // associations can be defined here
    console.log(models);
    Blob.belongsTo(models.BlobMappers);
    Blob.belongsTo(models.Item);
    Blob.belongsTo(models.User);
  };
  return Blob;
};

*/