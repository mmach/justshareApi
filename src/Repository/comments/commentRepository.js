import {BaseRepository} from "../../Architecture/Base/baseRepository.js";
import SequelizeDB from "../../Database/models/index.js";
import { UserDTO } from "justshare-shared";

/**
 *
 * @export
 * @class ActionPrivilegesRepository
 * @extends BaseRepository
 */
export default class CommentRepository extends BaseRepository {
  /**
   * Creates an instance of UserRepository.
   * @param   {{sequelizeDI:SequelizeDB}}
   * @memberof ActionPrivilegesRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.Comment);
    this.sequelizeDI = sequelizeDI;
  }
  async getByIUA({ iua_id, transaction }) {
    return this.entityDAO.findAll({
      where:
      {
        iua_id: iua_id,
        project_id: this.context.project.id
      },
      transaction: this.getTran({ transaction })
    })
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
