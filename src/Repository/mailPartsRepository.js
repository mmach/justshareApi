import BaseRepository from "../Architecture/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";
import { UserDTO } from "justshare-shared";

/**
 *
 * @export
 * @class UserRepository
 * @extends BaseRepository
 */
export default class MailPartsRepository extends BaseRepository {

  /**
   * Creates an instance of UserRepository.
   * @param   {{sequelizeDI:SequelizeDB}}
   * @memberof MailTypesRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.MailParts);
    this.sequelizeDI = sequelizeDI;
  }

  getAll({ model, transaction }) {
    return this.entityDAO.findAll({
      where:
      {
        project_id: this.context.project.id
    
      },


      transaction: this.getTran({ transaction })
    });
  }
}

