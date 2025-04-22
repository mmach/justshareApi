import { BaseRepositoryType } from "../../../Architecture";
import { UserRolesDBO } from "../../../DBO";
import { UserRoles } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";
import { IUserRolesRepository } from "../userRolesRepository";

export default class UserRolesRepository extends BaseRepositoryType<UserRolesDBO, UserRoles> implements IUserRolesRepository {
  sequelizeDI: IMappsDbModels
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }) {
    super(sequelizeDI.UserRoles);
    this.sequelizeDI = sequelizeDI;
  }
}


export const UserRolesRepositoryPlugin = {
  pluginName: "user-roles-repository",
  type: 'repository',
  di: 'userRolesRepositoryDI',
  classType: UserRolesRepository
};