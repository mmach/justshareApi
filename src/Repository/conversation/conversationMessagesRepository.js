import { BaseRepository } from "../../Architecture/Base/baseRepository.js";
import SequelizeDB from "../../Database/models/index.js";


/**
 *
 * @export
 * @class CityRepository
 * @extends BaseRepository
 */
export default class ConversationMessagesRepository extends BaseRepository {
  /**
   *Creates an instance of CategoryRepository.
   * @param {{sequelizeDI:SequelizeDB}}
   * @memberof CityRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.ConversationMessages);
    this.sequelizeDI = sequelizeDI;
  }
}
