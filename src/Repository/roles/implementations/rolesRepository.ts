import { BaseRepositoryType } from "../../../Architecture";
import { RolesDBO } from "../../../DBO";
import { Roles } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";
import { IRolesRepository } from "../rolesRepository";

export default class RolesRepository extends BaseRepositoryType<RolesDBO, Roles> implements IRolesRepository {
  sequelizeDI: IMappsDbModels
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }) {
    super(sequelizeDI.Roles);
    this.sequelizeDI = sequelizeDI;
  }
  async getRoles({ transaction }: { transaction?: number }): Promise<Roles[]> {
    return this.entityDAO.findAll({
      where: {},
      transaction: this.getTran({ transaction })
    });
  }
}

export const RolesRepositoryPlugin = {
  pluginName: "roles-repository",
  type: 'repository',
  di: 'rolesRepositoryDI',
  classType: RolesRepository
};