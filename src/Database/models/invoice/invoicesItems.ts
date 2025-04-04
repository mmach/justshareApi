
import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize";
import { InvoiceItemDTO } from "../../../Models/invoice";

/**
 * Interface for InvoiceItem instance
 */
export interface InvoiceItemInstance extends Model<InvoiceItemDTO>, InvoiceItemDTO {}

/**
 * InvoiceItem model initialization
 */
export default class InvoiceItem extends Model<InvoiceItemInstance, InvoiceItemDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<InvoiceItem> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: true
        },
        price_net: {
          type: DataTypes.FLOAT,
          allowNull: true
        },
        price_tax: {
          type: DataTypes.FLOAT,
          allowNull: true
        },
        tax: {
          type: DataTypes.FLOAT,
          allowNull: true
        },
        amount: {
          type: DataTypes.FLOAT,
          allowNull: true
        },
        currency: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        title: {
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
        tableName: 'InvoiceItems'
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