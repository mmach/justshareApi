import BaseRepository from "../Architecture/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";


/**
 *
 * @export
 * @class CategoryActionsRepository
 * @extends BaseRepository
 */
export default class CategoryActionsRepository extends BaseRepository {
  /**
   * Creates an instance of UserRepository.
   * @param   {{sequelizeDI:SequelizeDB}}
   * @memberof CategoryActionsRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.CategoryActions);

    this.sequelizeDI = sequelizeDI;
  }
}

