import {BaseRepository} from "../Architecture/Base/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";
import { UserDTO } from "justshare-shared";

/**
 *
 * @export
 * @class RolesRepository
 * @extends BaseRepository
 */
export default class RolesRepository extends BaseRepository {
  /**
   * Creates an instance of UserRepository.
   * @param   {{sequelizeDI:SequelizeDB}}
   * @memberof RolesRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.Roles);
    this.RolesDB = sequelizeDI.Roles;
    this.sequelizeDI = sequelizeDI;
  }
  async getRoles({ transaction }) {


    return this.entityDAO.findAll({
      where: {},

      transaction: this.getTran({ transaction })
    });

  }
}
