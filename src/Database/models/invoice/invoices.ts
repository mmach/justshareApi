

import { DataTypes, Model, ModelStatic, QueryTypes, Sequelize } from "sequelize";
import { BlobDTO } from "../blob/blob";
import { ItemUserActionDTO } from "../item/itemUserAction";
import { InvoiceItemDTO } from "./invoicesItems";
import { InvoiceUserDTO } from "./invoicesUsers";

/**
 * Interface for Invoice attributes
 */
export interface InvoiceDTO {
  id: string;
  blob_id?: string;
  invoice_user_src_id?: string;
  invoice_user_dest_id?: string;
  iua_id?: string;
  price?: number;
  price_net?: number;
  price_tax?: number;
  tax?: number;
  dueDate?: Date;
  currency?: string;
  title?: string;
  number?: number;
  number_string?: string;
  month?: number;
  year?: number;
  status?: string;
  status_id?: string;
  project_id?: string;
  action_id?: string;

  items?: InvoiceItemDTO[];
  user_src?: InvoiceUserDTO;
  user_dest?: InvoiceUserDTO;
  blob?: BlobDTO;
  iua?: ItemUserActionDTO;
}

/**
 * Interface for Invoice instance
 */
export interface InvoiceInstance extends Model<InvoiceDTO>, InvoiceDTO { }

/**
 * Invoice model initialization
 */
export default class Invoice extends Model<InvoiceInstance, InvoiceDTO> {
  static initModel(sequelize: Sequelize): ModelStatic<Invoice> {
    return super.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          autoIncrement: false,
          defaultValue: DataTypes.UUIDV4
        },
        blob_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        invoice_user_src_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        invoice_user_dest_id: {
          type: DataTypes.UUID,
          allowNull: true
        },
        iua_id: {
          type: DataTypes.UUID,
          allowNull: true
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
        dueDate: {
          field: 'dueDate',
          type: DataTypes.DATE,
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
        number: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        number_string: {
          type: DataTypes.TEXT,
          allowNull: true
        },
        month: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        year: {
          type: DataTypes.INTEGER,
          allowNull: true
        },
        status: {
          type: DataTypes.STRING,
          allowNull: true
        },
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
          allowNull: true
        }
      },
      {
        sequelize,
        tableName: 'Invoices'
      }
    );
  }

  static hooks(models: any, sequelize: Sequelize) {
    Invoice.beforeCreate(async (invoice:any, options) => {
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
          type: QueryTypes.SELECT
        }
      );
      invoice.number = (number[0] as any).number;
      let nmb = new Array(20).map(() => "0").join("");
      invoice.number_string = nmb.substring(0, 10 - invoice.number.toString().length) + invoice.number.toString();
      return invoice;
    });
  }

  static associate(models: any) {
    Invoice.hasMany(models.InvoiceItem, {
      as: "items",
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