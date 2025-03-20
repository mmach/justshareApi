import {BaseRepository} from "../Architecture/Base/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";
import { UserDTO } from "justshare-shared";

/**
 *
 * @export
 * @class UserRepository
 * @extends BaseRepository
 */
export default class PrivilegeRepository extends BaseRepository {
  /**
   * Creates an instance of UserRepository.
   * @param   {{sequelizeDI:SequelizeDB}}
   * @memberof UserRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.Privileges);
    this.sequelizeDI = sequelizeDI;
  }

  getPrivileges({  transaction }) {
    return this.entityDAO.findAll({
      where:
      {
        
      },
      transaction: this.getTran({ transaction })
    });
  }

}
