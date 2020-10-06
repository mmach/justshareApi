
'use strict';
import { Model } from 'sequelize';

/**
 * 
 * @export
 * @class Blob
 * @extends Sequelize.Model
 */
export default class EsItemSync extends Model {

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
        item_id:DataTypes.UUID,
        project_id:DataTypes.UUID,
        operation:DataTypes.STRING,

      },
      { sequelize,
        tableName: 'EsItemSyncs'
      }
    );
  }
  static associate(models) {

  }
}

