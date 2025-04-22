import { IBaseRepositoryType } from "../../Architecture/index.js";
import { ItemDBO } from "../../DBO/index.js";
import { Item } from "../../Domain/index.js";


export interface IItemRepository extends IBaseRepositoryType<ItemDBO, Item> {
  searchItem({
    search,
    transaction
  }: {
    search: { freetext: string; categoryList: string[]; size: number; page: number; prepareSearch: any };
    transaction?: number;
  }): Promise<object[]>;

  search({
    search,
    transaction
  }: {
    search: { freetext: string; categoryList: string[]; size: number; page: number; prepareSearch: any; user_id: string };
    transaction?: number;
  }): Promise<object[]>;

  setAsSyncElastic({ id, transaction }: { id: string | number; transaction?: number }): Promise<[affectedCount: number]>;

  getItemToSync({ transaction }: { transaction?: number }): Promise<Item[]>;

  getItem({
    uids,
    toSync,
    transaction
  }: {
    uids: string[];
    toSync: number;
    transaction?: number;
  }): Promise<Item[]>;

  deleteTag({ item_id, transaction }: { item_id: string | number; transaction?: number }): Promise<number>;

  insertTag({
    tag_id,
    item_id,
    transaction
  }: {
    tag_id: string;
    item_id: string;
    transaction?: number;
  }): Promise<Item>;

  addCategoryOptionTerm({
    model,
    transaction
  }: {
    model: any;
    transaction?: number;
  }): Promise<any>;

  removeCategoryOptionTerm({
    id,
    iua_id,
    transaction
  }: {
    id: string;
    iua_id: string;
    transaction?: number;
  }): Promise<number>;

  setItemProcessChain({
    id,
    item_id,
    process_id,
    process_chain_id,
    transaction
  }: {
    id: string;
    item_id: string;
    process_id: string;
    process_chain_id: string;
    transaction?: number;
  }): Promise<void>;

  isFreeTerm({
    model,
    transaction
  }: {
    model: { start_date: string; end_date: string; item_id: string; dim_id: string };
    transaction?: number;
  }): Promise<any[]>;

  searchItemCategoryByValueAndDimQuery({
    value,
    dim_name,
    transaction
  }: {
    value: string[];
    dim_name: string;
    transaction?: number;
  }): Promise<any[]>;
}
