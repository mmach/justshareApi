import {BaseRepository} from "../../Architecture/Base/baseRepository.js";
import SequelizeDB from "../../Database/models/index.js";
import { UserDTO } from "justshare-shared";

/**
 *
 * @export
 * @class UserRepository
 * @extends BaseRepository
 */
export default class MailTypesRepository extends BaseRepository {

  /**
   * Creates an instance of UserRepository.
   * @param   {{sequelizeDI:SequelizeDB}}
   * @memberof MailTypesRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.MailTypes);
    this.sequelizeDI = sequelizeDI;
  }
  getAll({ model, transaction }) {
    return this.entityDAO.findAll({
      where:
      {
        
      },
     

      transaction: this.getTran({ transaction })
    });
  }
}

