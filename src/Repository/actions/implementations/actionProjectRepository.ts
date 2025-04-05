import { BaseRepositoryType } from "../../../Architecture/Base/baseRepositoryType.js";
import { ActionsProjectDBO } from "../../../DBO/index.js";
import { ActionsProject } from "../../../Domain/index.js";
import { IMappsDbModels } from "../../../Domain/models.js";
import { IActionProjectRepository } from "../actionProjectRepository.js";


export default class ActionProjectRepository extends BaseRepositoryType<ActionsProjectDBO, ActionsProject> implements IActionProjectRepository {
  sequelizeDI: IMappsDbModels;
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }) {
    super(sequelizeDI.ActionsProject);
    this.sequelizeDI = sequelizeDI;
  }
  async getActions({ id, transaction }: { id: string, transaction?: number }): Promise<ActionsProject[]> {

    let where: { project_id: string, id?: string } = { project_id: this.context.project.id };
    if (id) {
      where.id = id
    }
    return this.entityDAO.findAll({
      where: where,
      include: [
        {
          model: this.sequelizeDI.Actions,
          as: "action_details"

        },
        {
          model: this.sequelizeDI.StatusActions,
          as: "statuses",
          include: [{
            model: this.sequelizeDI.StatusProjects,
            as: "status",
            include: [{
              model: this.sequelizeDI.Status,
              as: "status",
            }]
          }]
        },

        {
          model: this.sequelizeDI.ActionPrivileges,
          as: "action_privileges",
          include: [{
            model: this.sequelizeDI.PrivilegesProject,
            as: "privileges",
            include: [{
              model: this.sequelizeDI.Privileges,
              as: "privilege_details"
            }
            ]
          }
          ]
        }
      ],
      transaction: this.getTran({ transaction }) as any
    });

  }
}


export const ActionProjectRepositoryPlugin = {
  pluginName: "action-project-repository",
  type: 'repository',
  di: 'actionProjectRepositoryDI',
  classType: ActionProjectRepository
} 