import { Op } from "sequelize";
import BaseRepository from "../Architecture/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";
import { UserDTO } from "justshare-shared";

/**
 *
 * @export
 * @class CmsMenuItemsProjectsRepository
 * @extends BaseRepository
 */
export default class CmsMenuItemsProjectsRepository extends BaseRepository {
  /**
   * Creates an instance of UserRepository.
   * @param   {{sequelizeDI:SequelizeDB}}
   * @memberof CmsMenuItemsProjectsRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.CmsMenuItemsProjects);
    this.sequelizeDI = sequelizeDI;
  }

}
