
import { Model, ModelStatic, Sequelize, DataTypes } from "sequelize";

/**
 * Interface for InvoiceUser attributes
 */
export interface InvoiceUserDTO {
  id: string;
  name?: string;
  address?: string;
  tax_number?: string;
  country?: string;
  city?: string;
  zip_code?: string;
  user_name?: string;
  bank_account_nr?: string;
  user_type?: string;
  project_id?: string;
  user_id?: string;
}

/**
 * Interface for InvoiceUser instance
 */
export interface InvoiceUserInstance extends Model<InvoiceUserDTO>, InvoiceUserDTO {}

/**
 * InvoiceUser model initialization
 */
export default class InvoiceUser extends Model<InvoiceUserInstance, InvoiceUserDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<InvoiceUser> {
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
        user_type: {
          type: DataTypes.STRING,
          allowNull: true
        },
        project_id: {
          type: DataTypes.UUID,
          allowNull: false
        },
        user_id: {
          type: DataTypes.UUID,
          allowNull: true
        }
      },
      { 
        sequelize,
        tableName: 'InvoiceUsers'
      }
    );
  }

  static hooks(models: any, sequelize: Sequelize) {
    // Define hooks here
  }

  static associate(models: any) {
    // Define associations here
  }
}