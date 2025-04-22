import { IRolesProjectRepository } from "..";
import { BaseRepositoryType } from "../../../Architecture";
import { RolesProjectDBO } from "../../../DBO";
import { RolesProject } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";

export default class RolesProjectRepository extends BaseRepositoryType<RolesProjectDBO, RolesProject> implements IRolesProjectRepository {
  sequelizeDI: IMappsDbModels
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }) {
    super(sequelizeDI.RolesProject);
    this.sequelizeDI = sequelizeDI;
  }
  getRoles({ model, transaction }: { model: RolesProjectDBO; transaction?: number }): Promise<RolesProject[]> {
    let where: Partial<RolesProjectDBO> = {
      project_id: this.context.project.id,
    }
    if (model.id) {
      where.id = model.id
    }
    return this.entityDAO.findAll({
      where: where,
      include: [
        {
          model: this.sequelizeDI.Roles,
          as: "role_detail",
        }
      ],
      transaction: this.getTran({ transaction })
    });
  }
}

export const RolesProjectRepositoryPlugin = {
  pluginName: "roles-project-repository",
  type: 'repository',
  di: 'rolesProjectRepositoryDI',
  classType: RolesProjectRepository
};