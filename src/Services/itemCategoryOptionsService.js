import BaseService from "../Architecture/baseService.js";
import { SearchItemDTO } from 'justshare-shared';

/**
 *
 * @export
 * @class ItemService
 * @extends BaseService
 */
export default class ItemCategoryOptionsService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork}}
   */
  constructor({ unitOfWorkDI }) {
    super({ unitOfWorkDI, repository: "itemCategoryOptionRepository" });
  }

  /**
   *
   *
   * @param {{ id: Number }}
   * @returns
   * @memberof CategoryService
   */
  async upsertCategoryOption({ model, id }) {
    console.log('TO JEST TOO')
    console.log(model)
    await this.unitOfWorkDI.itemCategoryOptionRepository.upsert({
      model: {
        ...model,
        id: id
      },
      withProject: true
    });
  }
}