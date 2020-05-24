'use strict';

import { Model } from 'sequelize';



export default class ItemCategory extends Model {

  /**
   * 
   * @static
   * @param  {any} sequelize 
   * @param  {any} DataTypes 
   * @return {ItemCategory|Model}
   * @memberof ItemCategory
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
        item_id: DataTypes.UUID,
        category_id: DataTypes.UUID,
        is_visible:DataTypes.INTEGER
      },
      { sequelize }
    );
  }
  static associate(models) {
 
  }
}
