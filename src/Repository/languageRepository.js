import BaseRepository from "../Architecture/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";
import { UserDTO } from "justshare-shared";

/**
 *
 * @export
 * @class UserRepository
 * @extends BaseRepository
 */
export default class LanguageRepository extends BaseRepository {
  /**
   * Creates an instance of UserRepository.
   * @param   {{sequelizeDI:SequelizeDB}}
   * @memberof UserRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.Language);
    this.sequelizeDI = sequelizeDI;
  }

  async getLanguages({ transaction }) {


    return this.entityDAO.findAll({
      where: {},

      transaction: this.getTran({ transaction })
    });

  }

}
