import { BaseRepositoryType } from "../../../Architecture";
import { StatusProjectsDBO } from "../../../DBO";
import { StatusProjects } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";
import { IStatusProjectsRepository } from "../statusProjectsRepository";

export default class StatusProjectsRepository extends BaseRepositoryType<StatusProjectsDBO, StatusProjects> implements IStatusProjectsRepository {
  sequelizeDI: IMappsDbModels
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }) {

    super(sequelizeDI.StatusProjects);
    this.sequelizeDI = sequelizeDI;
  }

  getByProjectStatuses({ transaction }: { transaction?: number }): Promise<StatusProjects[]> {
    return this.entityDAO.findAll({
      where: {
        project_id: this.context.project.id
      },
      include: [
        {
          model: this.sequelizeDI.Translations,
          as: "translation",
          required: false
        },
        {
          model: this.sequelizeDI.Status,
          as: "status",
          required: false
        },

      ],
      transaction: this.getTran({ transaction })
    });
  }
  getByToken({ name, transaction }: { name: string, transaction?: number }): Promise<StatusProjects | null> {
    return this.entityDAO.findOne({
      where: {
        project_id: this.context.project.id
      },
      include: [
        {
          model: this.sequelizeDI.Translations,
          as: "translation",
          required: false
        },
        {
          model: this.sequelizeDI.Status,
          as: "status",
          required: true,
          where: {
            token: name
          }
        },

      ],
      transaction: this.getTran({ transaction })
    });
  }
  getByStatusId({ id, transaction }: { id: string, transaction?: number }): Promise<StatusProjects | null> {
    return this.entityDAO.findOne({
      where: {
        project_id: this.context.project.id,
        id: id
      },
      include: [
        {
          model: this.sequelizeDI.Translations,
          as: "translation",
          required: false
        },
        {
          model: this.sequelizeDI.Status,
          as: "status",
          required: true
          // where: {
          //  token: name
          // }
        },

      ],
      transaction: this.getTran({ transaction })
    });
  }
}


export const StatusProjectsRepositoryPlugin = {
  pluginName: "status-projects-repository",
  type: 'repository',
  di: 'statusProjectsRepositoryDI',
  classType: StatusProjectsRepository
};