import {BaseRepository} from "../Architecture/Base/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";
import { UserDTO } from "justshare-shared";

/**
 *
 * @export
 * @class ActionPrivilegesRepository
 * @extends BaseRepository
 */
export default class InvoiceUserRepository extends BaseRepository {
  /**
   * Creates an instance of UserRepository.
   * @param   {{sequelizeDI:SequelizeDB}}
   * @memberof ActionPrivilegesRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.InvoiceUser);
    this.sequelizeDI = sequelizeDI;
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
