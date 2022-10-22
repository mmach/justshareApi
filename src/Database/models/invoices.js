"use strict";
import { Model } from "sequelize";



/**
 *
 * @export
 * @class Item
 * @extends Sequelize.Model
 */
export default class Invoice extends Model {
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
        blob_id: {
          type: DataTypes.UUID,
        },
        invoice_user_src_id: {
          type: DataTypes.UUID,
        },
        invoice_user_dest_id: {
          type: DataTypes.UUID,
        },
        iua_id: {
          type: DataTypes.UUID,
        },

        price: DataTypes.FLOAT,
        price_net: DataTypes.FLOAT,
        price_tax: DataTypes.FLOAT,
        tax: DataTypes.FLOAT,
        dueDate: {
          field: 'dueDate',
          type: DataTypes.DATE
        },

        currency: DataTypes.TEXT,
        title: DataTypes.TEXT,
        number: DataTypes.INTEGER,
        number_string: DataTypes.TEXT,
        month: DataTypes.INTEGER,
        year: DataTypes.INTEGER,

        status: DataTypes.STRING,
        status_id: {
          type: DataTypes.UUID,
          allowNull: false
        },
        project_id: {
          type: DataTypes.UUID,
          allowNull: false
        },
        action_id: {
          type: DataTypes.UUID,
        }

      },
      { sequelize }
    );
  }
  static hooks(models, sequelize) {

    Invoice.beforeCreate(async (invoice, options) => {

      invoice.month = new Date().getMonth();
      invoice.year = new Date().getFullYear();
      let number = await sequelize.query(
        `
        SELECT COUNT(number)+1 as number  FROM Invoices WITH (NOLOCK)
        where project_id=:project_id
        AND month=:month
        AND year=:year
      `,
        {
          replacements: {
            project_id: invoice.project_id,
            month: invoice.month,
            year: invoice.year
          },
         // transaction: options.transaction,

          type: sequelize.QueryTypes.SELECT
        }
      );
      invoice.number = number[0].number
      let nmb = new Array(20).map((a) => { return "0" }).join("0");
      invoice.number_string = nmb.substring(0, 10 - invoice.number.toString().length) + invoice.number.toString()
      return invoice;

    })
  }
  static associate(models) {

    Invoice.hasMany(models.InvoiceItem, {
      as: "items",
      targetKey: "id",
      foreignKey: "invoice_id"
    });
    Invoice.belongsTo(models.InvoiceUser, {
      as: "user_src",
      targetKey: "id",
      foreignKey: "invoice_user_src_id"
    });
    Invoice.belongsTo(models.InvoiceUser, {
      as: "user_dest",
      targetKey: "id",
      foreignKey: "invoice_user_dest_id"
    });
    Invoice.belongsTo(models.Blob, {
      as: "blob",
      targetKey: "id",
      foreignKey: "blob_id"
    });
    Invoice.belongsTo(models.ItemUserAction, {
      as: "iua",
      targetKey: "id",
      foreignKey: "iua_id"
    });
  }
}
