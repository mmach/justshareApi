import BaseRepository from "../Architecture/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";
import { UserDTO } from "justshare-shared";

/**
 *
 * @export
 * @class ActionPrivilegesRepository
 * @extends BaseRepository
 */
export default class InvoiceRepository extends BaseRepository {
  /**
   * Creates an instance of UserRepository.
   * @param   {{sequelizeDI:SequelizeDB}}
   * @memberof ActionPrivilegesRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.Invoice);
    this.sequelizeDI = sequelizeDI;
  }
  getByInvoiceById({ id, transaction }) {
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

  async getUserInvoices({ iua_id, status, page, size, asAdmin, month, year, transaction }) {

    let offset = page * size;
    let limit = size;
    if (iua_id) {
      offset = 0;
      limit: 1
    }

    let obj = await this.sequelizeDI.sequelize.query(
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
        type: this.sequelizeDI.sequelize.QueryTypes.SELECT
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
  /* getPrivByName({ name, transaction }) {
     return this.entityDAO.findOne({
       where:
       {
         name: name,
         status: 1
       },
       transaction: this.getTran({ transaction })
     });
   }*/

}
