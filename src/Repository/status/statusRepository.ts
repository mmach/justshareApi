import { IBaseRepositoryType } from "../../Architecture";
import { StatusDBO } from "../../DBO";
import { Status } from "../../Domain";

export interface IStatusRepository extends IBaseRepositoryType<StatusDBO, Status> {
  getGlobalStatuses({ name, transaction }: { name: string; transaction?: number }): Promise<Status[]>;
}
