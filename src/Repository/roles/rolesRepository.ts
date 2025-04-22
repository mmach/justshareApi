import { IBaseRepositoryType } from "../../Architecture";
import { RolesDBO } from "../../DBO";
import { Roles } from "../../Domain";

export interface IRolesRepository extends IBaseRepositoryType<RolesDBO, Roles> {
  getRoles({ transaction }: { transaction?: number }): Promise<Roles[]>;
}
