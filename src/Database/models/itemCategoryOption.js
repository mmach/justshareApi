'use strict';

import { Model } from 'sequelize';



export default class ItemCategoryOption extends Model {

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
        value: DataTypes.TEXT,
        status: DataTypes.STRING,
        iua_id: DataTypes.UUID,
        dim_id: DataTypes.UUID,
        project_id:DataTypes.UUID

      },
      { sequelize,
        tableName: 'ItemCategoryOptions'
      }
    );
  }
  static associate(models) {
    ItemCategoryOption.belongsTo(models.CategoryOptionsLink, {
      as: "category_link",
      targetKey: "id",
      foreignKey: "col_id"
    });
    ItemCategoryOption.belongsTo(models.CategoryOptionsTemplate, {
      as: "cat_opt_temp",
      targetKey: "id",
      foreignKey: "co_temp_id"
    });
 
  }
}
