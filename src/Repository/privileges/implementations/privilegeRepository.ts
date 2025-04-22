import { BaseRepositoryType } from "../../../Architecture/index.js";
import { PrivilegesDBO } from "../../../DBO/index.js";
import { Privileges } from "../../../Domain/index.js";
import { IMappsDbModels } from "../../../Domain/models.js";
import { IPrivilegeRepository } from "../privilegeRepository.js";


export default class PrivilegeRepository extends BaseRepositoryType<PrivilegesDBO, Privileges> implements IPrivilegeRepository {
  sequelizeDI: IMappsDbModels
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }) {
    super(sequelizeDI.Privileges);
    this.sequelizeDI = sequelizeDI;
  }

  getPrivileges({ transaction }: { transaction?: number }): Promise<Privileges[]> {
    return this.entityDAO.findAll({
      where: {},
      transaction: this.getTran({ transaction })
    });
  }
}



export const PrivilegeRepositoryPlugin = {
  pluginName: "privilege-repository",
  type: 'repository',
  di: 'privilegeRepositoryDI',
  classType: PrivilegeRepository
};