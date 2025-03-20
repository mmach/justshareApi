import {BaseRepository} from "../Architecture/Base/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";

/**
 *
 * @export
 * @class UserRepository
 * @extends BaseRepository
 */
export default class UserAuthRepository extends BaseRepository {
  /**
   * Creates an instance of UserRepository.
   * @param   {{sequelizeDI:SequelizeDB}}
   * @memberof UserRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.UserAuths);
    this.UserAuths = sequelizeDI.UserAuths;
    this.sequelizeDI = sequelizeDI;
  }

  

}
