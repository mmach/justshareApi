import BaseRepository from "../Architecture/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";
import { UserDTO } from "justshare-shared";

/**
 *
 * @export
 * @class UserRepository
 * @extends BaseRepository
 */
export default class SeoRepository extends BaseRepository {

  /**
   * Creates an instance of UserRepository.
   * @param   {{sequelizeDI:SequelizeDB}}
   * @memberof MailTypesRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.Seos);
    this.sequelizeDI = sequelizeDI;
  }


}

