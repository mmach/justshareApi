import { IBaseRepositoryType } from "../../Architecture/index.js";
import { ItemTransactionCategoryOptionsDBO } from "../../DBO/index.js";
import { ItemTransactionCategoryOptions } from "../../Domain/index.js";


export interface IItemTransactionCategoryOptionsRepository
  extends IBaseRepositoryType<ItemTransactionCategoryOptionsDBO, ItemTransactionCategoryOptions> {}
