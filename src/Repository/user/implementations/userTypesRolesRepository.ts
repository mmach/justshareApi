import { BaseRepositoryType } from "../../../Architecture";
import { UserTypeRolesDBO } from "../../../DBO";
import { UserTypeRoles } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";


export default class UserTypesRolesRepository extends BaseRepositoryType<UserTypeRolesDBO, UserTypeRoles> {
  sequelizeDI: IMappsDbModels
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }) {
    super(sequelizeDI.UserTypeRoles);
    this.sequelizeDI = sequelizeDI;
  }

}


export const UserTypesRolesRepositoryPlugin = {
  pluginName: "user-types-roles-repository",
  type: 'repository',
  di: 'userTypesRolesRepositoryDI',
  classType: UserTypesRolesRepository
};