import { IBaseRepositoryType } from "../../Architecture/index.js";
import { ItemCategoryDBO } from "../../DBO/index.js";
import { ItemCategory } from "../../Domain/index.js";

export interface IItemCategoryRepository extends IBaseRepositoryType<ItemCategoryDBO, ItemCategory> {
  deleteCategories({
    item_id,
    category_id,
    transaction
  }: {
    item_id: string | number;
    category_id: string | number;
    transaction?: number;
  }): Promise<number>;
}
