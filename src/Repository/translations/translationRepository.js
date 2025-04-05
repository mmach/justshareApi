import {BaseRepository} from "../../Architecture/Base/baseRepository.js";
import SequelizeDB from "../../Database/models/index.js";
import { UserDTO } from "justshare-shared";

/**
 *
 * @export
 * @class UserRepository
 * @extends BaseRepository
 */
export default class TranslationRepository extends BaseRepository {

  /**
   * Creates an instance of UserRepository.
   * @param   {{sequelizeDI:SequelizeDB}}
   * @memberof TranslationRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.Translations);
    this.TranslationsDB = sequelizeDI.Translations;
    this.sequelizeDI = sequelizeDI;
  }
  getTokens({ code, token, transaction }) {
    let where = {
      project_id: this.context.project.id,

    }
    if (code) {
      where.type = code
    }
    if (token) {
      where.token = token
    }
    return this.TranslationsDB.findAll({
      where: where
      ,
      transaction: this.getTran({ transaction })
    });
  }
}

