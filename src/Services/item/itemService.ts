import { BaseServiceType, IBaseServiceType } from "../../Architecture";
import { ItemDBO, ItemCategoryOptionDBO, ItemCategoryOptionTermDBO } from "../../DBO";
import { DI } from "../../diTypes";
import { Item } from "../../Domain";

export default class ItemService extends BaseServiceType<ItemDBO, Item> implements IItemService {
  constructor({ unitOfWorkDI }: DI) {
    super({ unitOfWorkDI, repository: "itemRepository" });
  }



  async insertTag({ item_id, tag_id }: { item_id: string, tag_id: string }): Promise<void> {
    await this.unitOfWorkDI.itemRepository.insertTag({
      item_id: item_id,
      tag_id: tag_id
    });
  }

  async getItemToSync(): Promise<Item[]> {
    return await this.unitOfWorkDI.itemRepository.getItemToSync({});
  }

  async upsertCategoryOption({ model, item_id }: { model: ItemCategoryOptionDBO & any, item_id: string }): Promise<void> {
    await this.unitOfWorkDI.itemCategoryOptionRepository.upsert({
      model: {
        ...model,
        item_id: item_id,
        value: model.value ? model.value : model.val,
        co_id: model.element ? model.element : model.co_id,
        co_temp_id: model.cat_opt_id ? model.cat_opt_id : model.co_temp_id
      },
      withProject: true
    });
  }


  async getItem({ uids, toSync }: { uids: string[], toSync: number }): Promise<ItemDBO[] | undefined> {
    let result = await this.toJsonParse<ItemDBO[]>(this.unitOfWorkDI.itemRepository.getItem({ uids, toSync }));
    return result?.map(item => {
      let element = Object.assign({}, item)

      return element;
    })
  }

  async setAsSyncElastic({ id }: { id: string }): Promise<[affectedCount: number]> {
    return await this.unitOfWorkDI.itemRepository.setAsSyncElastic({ id })
  }

  async addCategoryOptionTerm({ model }: { model: ItemCategoryOptionTermDBO }): Promise<void> {
    //  search.prepareSearch = await this.unitOfWorkDI.textRepository.prepareSearch({ text: search.freetext, wildecard: 1 })
    //let result = this.unitOfWorkDI.itemRepository.search({ search });
    return await this.unitOfWorkDI.itemRepository.addCategoryOptionTerm({ model })
    //  return await this.toJsonParse(this.unitOfWorkDI.itemRepository.getItem({ uids: result, transaction }))
  }
  async removeCategoryOptionTerm({ id, iua_id, }: { id: string, iua_id: string }): Promise<number> {
    //  search.prepareSearch = await this.unitOfWorkDI.textRepository.prepareSearch({ text: search.freetext, wildecard: 1 })
    //let result = this.unitOfWorkDI.itemRepository.search({ search });
    return await this.unitOfWorkDI.itemRepository.removeCategoryOptionTerm({ id: id, iua_id: iua_id })
    //  return await this.toJsonParse(this.unitOfWorkDI.itemRepository.getItem({ uids: result, transaction }))
  }
  async isFreeTerm({ model }: {
    model: {
      start_date: string;
      end_date: string;
      item_id: string;
      dim_id: string;
    }
  }): Promise<any[]> {
    return await this.unitOfWorkDI.itemRepository.isFreeTerm({ model })

  }
  async setItemProcessChain({ id, item_id, process_id, process_chain_id }: { id: string, item_id: string, process_id: string, process_chain_id: string }): Promise<void> {
    return await this.unitOfWorkDI.itemRepository.setItemProcessChain({ id, item_id, process_id, process_chain_id })
  }

  async searchItemCategoryByValueAndDimQuery({ value, dim_name }: { value: string[], dim_name: string }): Promise<ItemCategoryOptionDBO[]> {
    return await this.unitOfWorkDI.itemRepository.searchItemCategoryByValueAndDimQuery({ value, dim_name })
  }
}


export interface IItemService extends IBaseServiceType<ItemDBO, Item> {
  insertTag(params: { item_id: string; tag_id: string }): Promise<void>;

  getItemToSync(): Promise<Item[]>;

  upsertCategoryOption(params: { model: ItemCategoryOptionDBO & any; item_id: string }): Promise<void>;

  getItem(params: { uids: string[]; toSync: number }): Promise<ItemDBO[] | undefined>;

  setAsSyncElastic(params: { id: string }): Promise<[affectedCount: number]>;

  addCategoryOptionTerm(params: { model: ItemCategoryOptionTermDBO }): Promise<void>;

  removeCategoryOptionTerm(params: { id: string; iua_id: string }): Promise<number>;

  isFreeTerm(params: {
    model: {
      start_date: string;
      end_date: string;
      item_id: string;
      dim_id: string;
    };
  }): Promise<any[]>;

  setItemProcessChain(params: {
    id: string;
    item_id: string;
    process_id: string;
    process_chain_id: string;
  }): Promise<void>;

  searchItemCategoryByValueAndDimQuery(params: { value: string[]; dim_name: string }): Promise<ItemCategoryOptionDBO[]>;
}

export const ItemServicePlugin = {
  pluginName: "item-service",
  type: "service",
  di: "itemServiceDI",
  classType: ItemService,
};