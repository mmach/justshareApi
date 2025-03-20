import {BaseRepository} from "../Architecture/Base/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";
import { UserDTO } from "justshare-shared";

/**
 *
 * @export
 * @class ActionRepository
 * @extends BaseRepository
 */
export default class ActionRepository extends BaseRepository {
  /**
   * Creates an instance of UserRepository.
   * @param   {{sequelizeDI:SequelizeDB}}
   * @memberof ActionRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.Actions);
    this.sequelizeDI = sequelizeDI;
  }

  async getActions({ transaction }) {


    return this.entityDAO.findAll({
      where: {},

      transaction: this.getTran({ transaction })
    });

  }
  /* getPrivByName({ name, transaction }) {
     return this.entityDAO.findOne({
       where:
       {
         name: name,
         status: 1
       },
       transaction: this.getTran({ transaction })
     });
   }*/

}
