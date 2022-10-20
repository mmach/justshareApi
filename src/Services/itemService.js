import BaseService from "../Architecture/baseService.js";
import { SearchItemDTO } from 'justshare-shared';

/**
 *
 * @export
 * @class ItemService
 * @extends BaseService
 */
export default class ItemService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork}}
   */
  constructor({ unitOfWorkDI }) {
    super({ unitOfWorkDI, repository: "itemRepository" });
  }

  /**
   *
   *
   * @param {{ id: Number }}
   * @returns
   * @memberof CategoryService
   */

  async insertTag({ item_id, tag_id }) {
    await this.unitOfWorkDI.itemRepository.insertTag({

      item_id: item_id,
      tag_id: tag_id

    });
  }

  async getItemToSync({ }) {
    return await this.unitOfWorkDI.itemRepository.getItemToSync({

    });
  }

  async upsertCategoryOption({ model, item_id }) {
    await this.unitOfWorkDI.itemCategoryOptionRepository.upsert({
      model: {
        ...model,
        item_id: item_id,
        value: model.value ? model.value : model.val,
        co_id: model.element ? model.element : model.co_id,
        co_temp_id: model.cat_opt_id ? model.cat_opt_id : model.co_temp_id
      },
      withProject:true
    });
  }

  async deleteTags({ itemId }) {
    return await this.unitOfWorkDI.itemRepository.deleteTags({
      item_id: itemId,
    });
  }
  async getItem({ uids, toSync }) {
    let result = await this.toJsonParse(this.unitOfWorkDI.itemRepository.getItem({ uids, toSync }));
    return result.map(item => {
      let element = Object.assign({}, item)

      return element;
    })
  }

  async setAsSyncElastic({ id }) {
    return await this.unitOfWorkDI.itemRepository.setAsSyncElastic({ id })
  }
  /**
   *
   *
   * @param {{search: SearchItemDTO}}
   * @memberof ItemService
   */
  async searchItem({ search }) {
    //  search.prepareSearch = await this.unitOfWorkDI.textRepository.prepareSearch({ text: search.freetext, wildecard: 1 })
    //let result = this.unitOfWorkDI.itemRepository.search({ search });
    return await this.unitOfWorkDI.itemRepository.getAll()
    //  return await this.toJsonParse(this.unitOfWorkDI.itemRepository.getItem({ uids: result, transaction }))
  }

  async addCategoryOptionTerm({ model }) {
    //  search.prepareSearch = await this.unitOfWorkDI.textRepository.prepareSearch({ text: search.freetext, wildecard: 1 })
    //let result = this.unitOfWorkDI.itemRepository.search({ search });
    return await this.unitOfWorkDI.itemRepository.addCategoryOptionTerm({ model })
    //  return await this.toJsonParse(this.unitOfWorkDI.itemRepository.getItem({ uids: result, transaction }))
  }
  async removeCategoryOptionTerm({ id, iua_id, }) {
    //  search.prepareSearch = await this.unitOfWorkDI.textRepository.prepareSearch({ text: search.freetext, wildecard: 1 })
    //let result = this.unitOfWorkDI.itemRepository.search({ search });
    return await this.unitOfWorkDI.itemRepository.removeCategoryOptionTerm({ id: id, iua_id: iua_id })
    //  return await this.toJsonParse(this.unitOfWorkDI.itemRepository.getItem({ uids: result, transaction }))
  }
  async isFreeTerm({ model }) {
    return await this.unitOfWorkDI.itemRepository.isFreeTerm({ model })

  }
  async setItemProcessChain({ id, item_id, process_id, process_chain_id }) {
    return await this.unitOfWorkDI.itemRepository.setItemProcessChain({ id, item_id, process_id, process_chain_id })
  }

  async searchItemCategoryByValueAndDimQuery({ value, dim_name }) {
    return await this.unitOfWorkDI.itemRepository.searchItemCategoryByValueAndDimQuery({ value, dim_name })
  }
}