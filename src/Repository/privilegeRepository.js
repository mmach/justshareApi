import BaseRepository from "../Architecture/baseRepository.js";
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
    super(sequelizeDI.Privilege);
    this.sequelizeDI = sequelizeDI;
  }

  getPrivByName({ name, transaction }) {
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
