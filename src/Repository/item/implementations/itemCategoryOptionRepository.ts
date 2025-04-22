import { BaseRepositoryType } from "../../../Architecture";
import { ItemCategoryOptionDBO } from "../../../DBO";
import { ItemCategoryOption } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";
import { IItemCategoryOptionRepository } from "../itemCategoryOptionRepository";

export default class ItemCategoryOptionRepository extends BaseRepositoryType<ItemCategoryOptionDBO,ItemCategoryOption> implements IItemCategoryOptionRepository {
  sequelizeDI: IMappsDbModels;

  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }) {
    super(sequelizeDI.ItemCategoryOption);
    this.sequelizeDI = sequelizeDI;
  }

}

export const ItemCategoryOptionRepositoryPlugin = {
  pluginName: "item-category-option-repository",
  type: 'repository',
  di: 'itemCategoryOptionRepositoryDI',
  classType: ItemCategoryOptionRepository
};