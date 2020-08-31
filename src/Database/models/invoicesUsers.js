"use strict";
import { Model } from "sequelize";
import uuidv4 from "uuid/v4";



/**
 *
 * @export
 * @class Item
 * @extends Sequelize.Model
 */
export default class InvoiceUser extends Model {
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
        name: DataTypes.TEXT,
        address: DataTypes.TEXT,
        tax_number: DataTypes.TEXT,
        country: DataTypes.TEXT,
        city: DataTypes.TEXT,
        zip_code: DataTypes.TEXT,
        user_name: DataTypes.TEXT,
        bank_account_nr: DataTypes.TEXT,
        user_type: DataTypes.STRING,
        project_id: {
          type: DataTypes.UUID,
          allowNull: false
        },
        user_id: {
          type: DataTypes.UUID,
        }

      },
      { sequelize }
    );
  }
  static hooks(models, sequelize) {


  }
  static associate(models) {

  }
}