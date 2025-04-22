import { IBaseRepositoryType } from "../../Architecture";
import { RolesProjectDBO } from "../../DBO";
import { RolesProject } from "../../Domain";

export interface IRolesProjectRepository extends IBaseRepositoryType<RolesProjectDBO, RolesProject> {
  getRoles({ model, transaction }: { model: RolesProjectDBO; transaction?: number }): Promise<RolesProject[]>;
}
