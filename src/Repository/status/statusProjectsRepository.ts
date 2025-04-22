import { IBaseRepositoryType } from "../../Architecture";
import { StatusProjectsDBO } from "../../DBO";
import { StatusProjects } from "../../Domain";


export interface IStatusProjectsRepository extends IBaseRepositoryType<StatusProjectsDBO, StatusProjects> {
  getByProjectStatuses({ transaction }: { transaction?: number }): Promise<StatusProjects[]>;
  getByToken({ name, transaction }: { name: string; transaction?: number }): Promise<StatusProjects | null>;
  getByStatusId({ id, transaction }: { id: string; transaction?: number }): Promise<StatusProjects | null>;
}
