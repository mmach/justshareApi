"use strict";
import { Model } from "sequelize";

/**
 *
 * @export
 * @class Item
 * @extends Sequelize.Model
 */
export default class CategoryOptionsTemplate extends Model {
  /**
   *
   * @static
   * @param  {any} sequelize
   * @param  {any} DataTypes
   * @return {Region|Model}
   * @memberof CategoryOptionsTemplate
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
        co_id: {
          type: DataTypes.UUID
        },
        cott_id:{
          type: DataTypes.UUID
        },
        value: {
          type: DataTypes.STRING,
        }, 
         value_pl: {
          type: DataTypes.STRING,
        }, 
        value_us:{
          type: DataTypes.STRING,
  
        },
        value_de:{
          type: DataTypes.STRING,
  
        },
        value_ru:{
          type: DataTypes.STRING,
  
        },
        value_fr:{
          type: DataTypes.STRING,
  
        },value_es:{
          type: DataTypes.STRING,
  
        },
        value_no:{
          type: DataTypes.STRING,
  
        },
        value_zh_cn:{
          type: DataTypes.STRING,
        },
        placeholder: {
          type: DataTypes.STRING,
        }, 
         placeholder_pl: {
          type: DataTypes.STRING,
        }, 
        placeholder_us:{
          type: DataTypes.STRING,
  
        },
        placeholder_de:{
          type: DataTypes.STRING,
  
        },
        placeholder_ru:{
          type: DataTypes.STRING,
  
        },
        placeholder_fr:{
          type: DataTypes.STRING,
  
        },placeholder_es:{
          type: DataTypes.STRING,
  
        },
        placeholder_no:{
          type: DataTypes.STRING,
  
        },
        placeholder_zh_cn:{
          type: DataTypes.STRING,
        }
        ,status: {
          type: DataTypes.BOOLEAN,
        },
        order: {
          type: DataTypes.INTEGER,
        },
        is_not_in_clob:{
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
        func:{
          type: DataTypes.STRING,
        },
        is_visible_view: {
          type: DataTypes.BOOLEAN,
          allowNull: true
        },
   
        
      },
      { sequelize }
    );
  }
  static associate(models) {
    CategoryOptionsTemplate.belongsTo(models.CategoryOptionsTypeTemplate, { as: "cat_opt_type_template", targetKey: 'id', foreignKey: "cott_id" });

  }
}
