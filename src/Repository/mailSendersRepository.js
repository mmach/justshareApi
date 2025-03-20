import {BaseRepository} from "../Architecture/Base/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";
import { UserDTO } from "justshare-shared";

/**
 *
 * @export
 * @class UserRepository
 * @extends BaseRepository
 */
export default class MailSendersRepository extends BaseRepository {

  /**
   * Creates an instance of UserRepository.
   * @param   {{sequelizeDI:SequelizeDB}}
   * @memberof MailTypesRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.MailSenders);
    this.sequelizeDI = sequelizeDI;
  }

  getAll({ model, transaction }) {
    return this.entityDAO.findAll({
      where:
      {
        project_id: this.context.project.id
    
      },
      include: [
        {
          model: this.sequelizeDI.Translations,
          as: "translation"
        
        },
      ],

      transaction: this.getTran({ transaction })
    });
  }
}

