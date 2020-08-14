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
