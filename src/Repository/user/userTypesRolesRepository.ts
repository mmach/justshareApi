import { IBaseRepositoryType } from "../../Architecture";
import { UserTypeRolesDBO } from "../../DBO";
import { UserTypeRoles } from "../../Domain";

export interface IUserTypesRolesRepository extends IBaseRepositoryType<UserTypeRolesDBO, UserTypeRoles> {}
