'use strict';

import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { UserInvoiceValueDBO } from "../../DBO/user";
/**
 * Interface for UserInvoiceValue instance
 */
interface UserInvoiceValueInstance extends Model<UserInvoiceValueDBO>, UserInvoiceValueDBO { }

/**
 * UserInvoiceValue model initialization
 */
export class UserInvoiceValue extends Model<UserInvoiceValueInstance, UserInvoiceValueDBO> {
  static initModel(sequelize: Sequelize): ModelStatic<UserInvoiceValue> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        name: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        address: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        tax_number: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        country: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        city: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        zip_code: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        user_name: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        bank_account_nr: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        project_id: {
          type: DataTypes.UUID,
          allowNull: false
        }
      },
      {
        sequelize,
        tableName: 'UserInvoiceValues'
      }
    );
  }

  static hooks(models: any, sequelize: Sequelize) {
    // Define hooks here
  }

  static associate(models: any) {
    UserInvoiceValue.hasOne(models.Users, { as: "user", foreignKey: "user_invoice_data_id" });
  }
}