import { Op } from "sequelize";
import BaseRepository from "../Architecture/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";
import { UserDTO } from "justshare-shared";

/**
 *
 * @export
 * @class CmsMenuItemsPrivilegesProjectRepository
 * @extends BaseRepository
 */
export default class CmsMenuItemsPrivilegesProjectRepository extends BaseRepository {
  /**
   * Creates an instance of UserRepository.
   * @param   {{sequelizeDI:SequelizeDB}}
   * @memberof CmsMenuItemsPrivilegesProjectRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.CmsMenuItemsPrivilegesProjects);
    this.sequelizeDI = sequelizeDI;
  }

}
