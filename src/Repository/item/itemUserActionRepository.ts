import { IBaseRepositoryType } from "../../Architecture/index.js";
import { ItemUserActionDBO } from "../../DBO/index.js";
import { ItemUserAction } from "../../Domain/index.js";

export interface IItemUserActionRepository extends IBaseRepositoryType<ItemUserActionDBO, ItemUserAction> {
  getItemUserActions({
    item_id,
    iua_id,
    status,
    transaction
  }: {
    item_id?: string;
    iua_id?: string | string[];
    status?: number;
    transaction?: number;
  }): Promise<ItemUserAction[]>;

  getItemUserActionsList({
    action_id,
    status_id,
    size,
    page,
    asAdmin,
    process_id,
    is_closed,
    item_id,
    transaction
  }: {
    action_id?: string;
    status_id?: number;
    size: number;
    page: number;
    asAdmin: boolean;
    process_id?: string;
    is_closed?: boolean;
    item_id?: string;
    transaction?: number;
  }): Promise<object[]>;

  getItemUserActionHistory({
    iua_id,
    transaction
  }: {
    iua_id: string;
    transaction?: number;
  }): Promise<object[]>;

  getItem({
    uids,
    toSync,
    transaction
  }: {
    uids: string[];
    toSync: number;
    transaction?: number;
  }): Promise<ItemUserAction[]>;
}
