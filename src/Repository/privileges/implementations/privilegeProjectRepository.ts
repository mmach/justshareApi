import { BaseRepositoryType } from "../../../Architecture";
import { PrivilegesProjectDBO } from "../../../DBO";
import { PrivilegesProject } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";
import { IPrivilegeProjectRepository } from "../privilegeProjectRepository.js";


export default class PrivilegeProjectRepository extends BaseRepositoryType<PrivilegesProjectDBO, PrivilegesProject> implements IPrivilegeProjectRepository {
  sequelizeDI: IMappsDbModels
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }) {
    super(sequelizeDI.PrivilegesProject);
    this.sequelizeDI = sequelizeDI;
  }
  getPrivileges({ transaction }: { transaction?: number }): Promise<PrivilegesProject[]> {
    return this.entityDAO.findAll({
      where:
      {
        project_id: this.context.project.id
      },
      include: [
        {
          model: this.sequelizeDI.Privileges,
          as: "privilege_details"
        },
      ],

      transaction: this.getTran({ transaction })
    });
  }
}

export const PrivilegeProjectRepositoryPlugin = {
  pluginName: "privilege-project-repository",
  type: 'repository',
  di: 'privilegeProjectRepositoryDI',
  classType: PrivilegeProjectRepository
};