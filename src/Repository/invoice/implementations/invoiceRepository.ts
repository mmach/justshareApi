import { Sequelize, QueryTypes } from "sequelize";
import { BaseRepositoryType } from "../../../Architecture";
import { InvoiceDBO } from "../../../DBO";
import { Invoice } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";
import { IInvoiceRepository } from "../invoiceRepository";

export default class InvoiceRepository extends BaseRepositoryType<InvoiceDBO, Invoice> implements IInvoiceRepository {
  sequelizeDI: IMappsDbModels & { sequelize: Sequelize }
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels & { sequelize: Sequelize } }) {
    super(sequelizeDI.Invoice);
    this.sequelizeDI = sequelizeDI;
  }
  getByInvoiceById({ id, transaction }: { id: string, transaction?: number }): Promise<Invoice | null> {
    return this.entityDAO.findOne({
      where:
      {
        id: id,
        project_id: this.context.project.id
      },
      include: [
        {
          model: this.sequelizeDI.InvoiceUser,
          required: true,
          as: "user_src"

        },
        {
          model: this.sequelizeDI.InvoiceUser,
          required: true,
          as: "user_dest"

        },
        {
          model: this.sequelizeDI.InvoiceItem,
          required: true,
          as: "items"

        }
      ],
      transaction: this.getTran({ transaction })
    });
  }

  async getUserInvoices({ iua_id, status, page, size, asAdmin, month, year, transaction }:
    { iua_id?: string, status?: string, page: number, size: number, asAdmin?: boolean, month?: number, year?: number, transaction?: number }): Promise<Invoice[]> {

    let offset = page * size;
    let limit = size;
    if (iua_id) {
      offset = 0;
      limit = 1;
    }

    let obj: InvoiceDBO[] = await this.sequelizeDI.sequelize.query(
      `WITH getUserInvoice AS (
        SELECT id FROM InvoiceUsers 
        WHERE 
        ${asAdmin == true && this.context.user.is_admin == true ? ' 1=1 ' : `user_id = :user_id`}
        AND project_id= :project_id
        )SELECT* FROM (
        SELECT Invoices.*  FROM Invoices 
        JOIN getUserInvoice ON Invoices.invoice_user_src_id = getUserInvoice.id
        WHERE 1=1
        ${iua_id ? ` AND iua_id=:iua_id` : ''}
        ${status ? ` AND status_id=:status` : ''}
        ${month ? ` AND month=:month ` : ''}
        ${year ? ` AND year=:year ` : ''}

        UNION
         SELECT Invoices.* FROM Invoices JOIN getUserInvoice ON Invoices.invoice_user_dest_id = getUserInvoice.id) Invoices
         WHERE 1=1
         ${iua_id ? ` AND iua_id=:iua_id` : ''}
         ${status ? ` AND status_id=:status` : ''}
         ${month ? ` AND month=:month ` : ''}
         ${year ? ` AND year=:year ` : ''}
        ORDER BY Invoices.created_at DESC ${year ? '' : 'offset :offset rows FETCH next :limit rows only'}`
      ,
      {
        replacements: {
          user_id: this.context.user.id,
          project_id: this.context.project.id,
          offset: offset ? offset : 0,
          limit: limit ? limit : 1,
          iua_id: iua_id,
          status: status,
          month: month,
          year: year
        },
        transaction: this.getTran({ transaction }),
        type: QueryTypes.SELECT
      });



    return await this.entityDAO.findAll({
      where:
      {
        id: obj.map(i => i.id),
        project_id: this.context.project.id
      },
      include: [
        {
          model: this.sequelizeDI.InvoiceUser,
          required: true,
          as: "user_src"

        },
        {
          model: this.sequelizeDI.InvoiceUser,
          required: true,
          as: "user_dest"

        },
        {
          model: this.sequelizeDI.InvoiceItem,
          required: true,
          as: "items"

        },
        {
          model: this.sequelizeDI.Blob,
          required: true,
          as: "blob"

        },
        {
          model: this.sequelizeDI.ItemUserAction,
          required: true,
          as: "iua"

        }
      ],
      transaction: this.getTran({ transaction })
    });
  }
  
}




export const InvoiceRepositoryPlugin = {
  pluginName: "invoice-repository",
  type: 'repository',
  di: 'invoiceRepositoryDI',
  classType: InvoiceRepository
};