import {BaseRepository} from "../Architecture/Base/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";
/**
 *
 * @export
 * @class BlobRepository
 * @extends ItemCategoryOptionRepository
 */
export default class ItemTransactionCategoryOptionsRepository extends BaseRepository {
  /**
   *Creates an instance of CategoryRepository.
   * @param {{sequelizeDI:SequelizeDB}}
   * @memberof ItemCategoryOptionRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.ItemTransactionCategoryOptions);
    this.sequelizeDI = sequelizeDI;
  }

}
