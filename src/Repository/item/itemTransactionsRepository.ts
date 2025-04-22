import { IBaseRepositoryType } from "../../Architecture/index.js";
import { ItemTransactionDBO } from "../../DBO/index.js";
import { ItemTransaction } from "../../Domain/index.js";

export interface IItemTransactionsRepository extends IBaseRepositoryType<ItemTransactionDBO, ItemTransaction> {
  getRootIuaIds({ iua_ids, transaction }: { iua_ids: string[]; transaction?: number }): Promise<object[]>;
  getAllChildrenIUA({
    iua_ids,
    transaction
  }: {
    iua_ids: string[];
    transaction?: number;
  }): Promise<{ iua_id: string; iua_grouping: string; step: number }[]>;
  getFromRootIuaAllIuaIds({
    iua_ids,
    transaction
  }: {
    iua_ids: string[];
    transaction?: number;
  }): Promise<{ iua_id: string; root_iua_id: string; step: number }[]>;
  getItemTransaction({
    iua_id,
    status_id,
    transaction
  }: {
    iua_id: string[];
    status_id: number;
    transaction?: number;
  }): Promise<ItemTransaction[]>;
}
