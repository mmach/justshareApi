import { IBaseRepositoryType } from "../../Architecture";
import { PrivilegesProjectDBO } from "../../DBO";
import { PrivilegesProject } from "../../Domain";



export interface IPrivilegeProjectRepository extends IBaseRepositoryType<PrivilegesProjectDBO, PrivilegesProject> {
  getPrivileges({ transaction }: { transaction?: number }): Promise<PrivilegesProject[]>;
}
