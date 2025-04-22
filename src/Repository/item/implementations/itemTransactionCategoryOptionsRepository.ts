import { BaseRepositoryType } from "../../../Architecture";
import { ItemTransactionCategoryOptionsDBO } from "../../../DBO";
import { ItemTransactionCategoryOptions } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";
import { IItemTransactionCategoryOptionsRepository } from "../itemTransactionCategoryOptionsRepository";


export default class ItemTransactionCategoryOptionsRepository extends BaseRepositoryType<ItemTransactionCategoryOptionsDBO, ItemTransactionCategoryOptions> implements IItemTransactionCategoryOptionsRepository  {
  sequelizeDI: IMappsDbModels;

  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }) {
    super(sequelizeDI.ItemTransactionCategoryOptions);
    this.sequelizeDI = sequelizeDI;
  }
}

export const ItemTransactionCategoryOptionsRepositoryPlugin = {
  pluginName: "item-transaction-category-options-repository",
  type: 'repository',
  di: 'itemTransactionCategoryOptionsRepositoryDI',
  classType: ItemTransactionCategoryOptionsRepository
};