import { BaseServiceType, IBaseServiceType } from "../../Architecture";
import { ItemCategoryOptionDBO } from "../../DBO";
import { DI } from "../../diTypes";
import { ItemCategoryOption } from "../../Domain";


export interface IItemCategoryOptionsService extends IBaseServiceType<ItemCategoryOptionDBO, ItemCategoryOption> {
  upsertCategoryOption(params: { model: ItemCategoryOptionDBO; id: string }): Promise<void>;
}

export default class ItemCategoryOptionsService extends BaseServiceType<ItemCategoryOptionDBO, ItemCategoryOption>  {
  constructor({ unitOfWorkDI }: DI) {
    super({ unitOfWorkDI, repository: "itemCategoryOptionRepository" });
  }

  async upsertCategoryOption({ model, id }:{ model: ItemCategoryOptionDBO, id: string }): Promise<void> {
    await this.unitOfWorkDI.itemCategoryOptionRepository.upsert({
      model: {
        ...model,
        id: id
      },
      withProject: true
    });
  }
}

export const ItemCategoryOptionsServicePlugin = {
  pluginName: "item-category-options-service",
  type: "service",
  di: "itemCategoryOptionsServiceDI",
  classType: ItemCategoryOptionsService,
};