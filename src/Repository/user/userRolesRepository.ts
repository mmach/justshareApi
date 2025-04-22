import { IBaseRepositoryType } from "../../Architecture";
import { UserRolesDBO } from "../../DBO";
import { UserRoles } from "../../Domain";

export interface IUserRolesRepository extends IBaseRepositoryType<UserRolesDBO, UserRoles> { }
