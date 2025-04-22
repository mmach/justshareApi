import { BaseRepositoryType } from "../../../Architecture";
import { ItemCategoryDBO } from "../../../DBO";
import { ItemCategory } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";
import { IItemCategoryRepository } from "../itemCategoryRepository";

export default class ItemCategoryRepository extends BaseRepositoryType<ItemCategoryDBO, ItemCategory> implements IItemCategoryRepository {
  sequelizeDI: IMappsDbModels;

  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }) {
    super(sequelizeDI.ItemCategory);
    this.sequelizeDI = sequelizeDI;
  }
  deleteCategories({ item_id, category_id, transaction }: { item_id: string | number, category_id: string | number, transaction?: number }): Promise<number> {
    return this.entityDAO.destroy({
      where: {
        item_id: this.toStr(item_id),
        category_id: this.toStr(category_id)
      },
      transaction: this.getTran({ transaction })
    });
  }
}


export const ItemCategoryRepositoryPlugin = {
  pluginName: "item-category-repository",
  type: 'repository',
  di: 'itemCategoryRepositoryDI',
  classType: ItemCategoryRepository
};