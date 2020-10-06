'use strict';

import { Model } from 'sequelize';



export default class ItemCategoryOptionTerm extends Model {

  /**
   * 
   * @static
   * @param  {any} sequelize 
   * @param  {any} DataTypes 
   * @return {itemCategoryOption|Model}
   * @memberof itemCategoryOption
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
        col_id: DataTypes.UUID,
        co_temp_id: DataTypes.UUID,
        start_date: DataTypes.DATE,
        project_id: DataTypes.UUID,
        end_date: DataTypes.DATE,
        iua_id: DataTypes.UUID,
        dim_id: DataTypes.UUID,
        co_id:DataTypes.UUID,

      },
      { sequelize ,
        tableName: 'ItemCategoryOptionTerms'
      }
    );
  }
  static associate(models) {
    
 
  }
}
