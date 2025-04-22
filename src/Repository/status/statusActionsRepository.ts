import { IBaseRepositoryType } from "../../Architecture";
import { StatusActionsDBO } from "../../DBO";
import { StatusActions } from "../../Domain";

export interface IStatusActionsRepository extends IBaseRepositoryType<StatusActionsDBO, StatusActions> {
  deleteStatus({
    action_id,
    status_id,
    transaction
  }: {
    action_id: string;
    status_id: string;
    transaction?: number;
  }): Promise<number>;
}
