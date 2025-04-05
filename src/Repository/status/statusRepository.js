import {BaseRepository} from "../../Architecture/Base/baseRepository.js";
import SequelizeDB from "../../Database/models/index.js";
import { UserDTO } from "justshare-shared";

/**
 *
 * @export
 * @class ActionRepository
 * @extends BaseRepository
 */
export default class StatusRepository extends BaseRepository {
  /**
   * Creates an instance of UserRepository.
   * @param   {{sequelizeDI:SequelizeDB}}
   * @memberof ActionRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.Status);
    this.sequelizeDI = sequelizeDI;
  }

  getGlobalStatuses({ name, transaction }) {
    return this.entityDAO.findAll({
     
      transaction: this.getTran({ transaction })
    });
  }

}
