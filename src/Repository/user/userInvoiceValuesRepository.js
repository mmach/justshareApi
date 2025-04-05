import {BaseRepository} from "../../Architecture/Base/baseRepository.js";
import SequelizeDB from "../../Database/models/index.js";
import { UserDTO } from "justshare-shared";

/**
 *
 * @export
 * @class ActionPrivilegesRepository
 * @extends BaseRepository
 */
export default class UserInvoiceValuesRepository extends BaseRepository {
  /**
   * Creates an instance of UserRepository.
   * @param   {{sequelizeDI:SequelizeDB}}
   * @memberof ActionPrivilegesRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.UserInvoiceValue);
    this.sequelizeDI = sequelizeDI;
  }

  getUserInvoiceData({ user_id ,transaction}) {
    return this.entityDAO.findOne({
      where:
      {
        project_id: this.context.project.id,

      },
      include: [
        {
          model: this.sequelizeDI.Users,
          as: "user",
          required: true,
          where: {
            id: user_id
          }
        },
      ],
      transaction: this.getTran({ transaction })
    });
  }
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


