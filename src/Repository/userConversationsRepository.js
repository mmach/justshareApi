import {BaseRepository} from "../Architecture/Base/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";
import {CityDTO} from "justshare-shared";
import PrepareSearch from "../Architecture/prepareSearch.js";


/**
 *
 * @export
 * @class CityRepository
 * @extends BaseRepository
 */
export default class UserConversationsRepository extends BaseRepository {
  /**
   *Creates an instance of CategoryRepository.
   * @param {{sequelizeDI:SequelizeDB}}
   * @memberof CityRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.UserConversation);
    this.sequelizeDI = sequelizeDI;
  }


}
