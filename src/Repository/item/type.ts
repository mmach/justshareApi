import { IItemRepository } from "./itemRepository.js";
import { IItemCategoryRepository } from "./itemCategoryRepository.js";
import { IItemCategoryOptionRepository } from "./itemCategoryOptionRepository.js";
import { IItemTransactionCategoryOptionsRepository } from "./itemTransactionCategoryOptionsRepository.js";
import { IItemTransactionsRepository } from "./itemTransactionsRepository.js";
import { IItemUserActionRepository } from "./itemUserActionRepository.js";

export type ITEM_REPOSITORY = {
  itemRepositoryDI: IItemRepository;
  itemCategoryRepositoryDI: IItemCategoryRepository;
  itemCategoryOptionRepositoryDI: IItemCategoryOptionRepository;
  itemTransactionCategoryOptionsRepositoryDI: IItemTransactionCategoryOptionsRepository;
  itemTransactionRepositoryDI: IItemTransactionsRepository;
  itemUserActionRepositoryDI: IItemUserActionRepository;
};