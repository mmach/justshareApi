import { Op } from "sequelize";
import BaseRepository from "../Architecture/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";
import { UserDTO } from "justshare-shared";

/**
 *
 * @export
 * @class CmsPageProjectsRepository
 * @extends BaseRepository
 */
export default class CmsPageProjectsRepository extends BaseRepository {
  /**
   * Creates an instance of UserRepository.
   * @param   {{sequelizeDI:SequelizeDB}}
   * @memberof CmsMenuProjectsRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.CmsPageProjects);
    this.sequelizeDI = sequelizeDI;
  }

}
