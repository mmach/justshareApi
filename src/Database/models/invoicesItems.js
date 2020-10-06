"use strict";
import { Model } from "sequelize";
import uuidv4 from "uuid/v4";



/**
 *
 * @export
 * @class Item
 * @extends Sequelize.Model
 */
export default class InvoiceItem extends Model {
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


        price: DataTypes.FLOAT,
        price_net: DataTypes.FLOAT,
        price_tax: DataTypes.FLOAT,
        tax: DataTypes.FLOAT,
        amount: DataTypes.FLOAT,
        currency: DataTypes.TEXT,
        title: DataTypes.TEXT,

        project_id: {
          type: DataTypes.UUID,
          allowNull: false
        }
       

      },
      { sequelize,
        tableName: 'InvoiceItems'
      }
    );
  }
  static hooks(models, sequelize) {


  }
  static associate(models) {

  }
}
