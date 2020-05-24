import BaseRepository from "../Architecture/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";
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

}
