import { IBaseRepositoryType } from "../../Architecture/index.js";
import { ItemCategoryOptionDBO } from "../../DBO/index.js";
import { ItemCategoryOption } from "../../Domain/index.js";

export interface IItemCategoryOptionRepository extends IBaseRepositoryType<ItemCategoryOptionDBO, ItemCategoryOption> {}
