import BaseService from "../Architecture/baseService.js";
import { SearchItemDTO } from 'justshare-shared';

/**
 *
 * @export
 * @class ItemService
 * @extends BaseService
 */
export default class ItemUserActionService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork}}
   */
  constructor({ unitOfWorkDI }) {
    super({ unitOfWorkDI, repository: "itemUserActionRepository" });
  }

  async getItemUserActions({ item_id, iua_id, status }) {
    return await this.toJsonParse(this.unitOfWorkDI.itemUserActionRepository.getItemUserActions({ item_id, iua_id, status }))
  }
}