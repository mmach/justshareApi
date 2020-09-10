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

  async getItemUserActionsList({ action_id, status_id, page, size }) {

    //move to dynamic sql !!!
    //create new query for search by ppl
    return await this.unitOfWorkDI.itemUserActionRepository.getItemUserActionsList({ action_id, status_id, page, size })


  }

  async getItemUserActionHistory({ iua_id }) {
    let hist = await this.unitOfWorkDI.itemUserActionRepository.getItemUserActionHistory({ iua_id })
    return await this.unitOfWorkDI.itemUserActionRepository.getItemUserActions({ iua_id: hist.map(i => { return i.iua_id }) })

  }
}