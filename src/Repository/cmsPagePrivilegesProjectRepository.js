import { Op } from "sequelize";
import BaseRepository from "../Architecture/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";
import { UserDTO } from "justshare-shared";

/**
 *
 * @export
 * @class CmsPagePrivilegesProjectRepository
 * @extends BaseRepository
 */
export default class CmsPagePrivilegesProjectRepository extends BaseRepository {
  /**
   * Creates an instance of UserRepository.
   * @param   {{sequelizeDI:SequelizeDB}}
   * @memberof CmsPagePrivilegesProjectRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.CmsMenuItemsPrivilegesProjects);
    this.sequelizeDI = sequelizeDI;
  }

}
