import {BaseRepository} from "../Architecture/Base/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";
import { UserDTO } from "justshare-shared";

/**
 *
 * @export
 * @class ActionPrivilegesRepository
 * @extends BaseRepository
 */
export default class ActionPrivilegesRepository extends BaseRepository {
  /**
   * Creates an instance of UserRepository.
   * @param   {{sequelizeDI:SequelizeDB}}
   * @memberof ActionPrivilegesRepository
   */
  
  constructor({ sequelizeDI }) {
    super(sequelizeDI.ActionPrivileges);
    this.sequelizeDI = sequelizeDI;
  }

  async getPrivByName({ name, transaction }) {
    var value = await sequelizeDI.ActionPrivileges.findOne({});
    return this.entityDAO.findOne({
      where:
      {
        name: name,
        status: 1
      },
      transaction: this.getTran({ transaction })
    });
  }

}
