"use strict";
import { Model } from "sequelize";
import uuidv4 from "uuid/v4";



/**
 *
 * @export
 * @class Item
 * @extends Sequelize.Model
 */
export default class UserInvoiceValue extends Model {
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
        name: DataTypes.FLOAT,
        address: DataTypes.FLOAT,
        tax_number: DataTypes.FLOAT,
        country: DataTypes.DATE,
        city: DataTypes.FLOAT,
        zip_code: DataTypes.TEXT,
        user_name: DataTypes.TEXT,
        bank_account_nr: DataTypes.TEXT,
        project_id: {
          type: DataTypes.UUID,
          allowNull: false
        }


      },
      { sequelize }
    );
  }
  static hooks(models, sequelize) {


  }
  static associate(models) {
    UserInvoiceValue.hasOne(models.Users, { as: "user", targetKey: 'id', foreignKey: "user_invoice_data_id" });

  }
}
