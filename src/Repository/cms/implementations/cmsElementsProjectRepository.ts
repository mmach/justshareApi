import { Op } from "sequelize";
import { BaseRepositoryType } from "../../../Architecture";
import { CmsElementsProjectsDBO } from "../../../DBO";
import { CmsElementsProject } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";
import { ICmsElementsProjectRepository } from "../cmsElementsProjectRepository";

export default class CmsElementsProjectRepository extends BaseRepositoryType<CmsElementsProjectsDBO, CmsElementsProject> implements ICmsElementsProjectRepository {
  sequelizeDI: IMappsDbModels
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }) {
    super(sequelizeDI.CmsElementsProject);
    this.sequelizeDI = sequelizeDI;
  }

  getCmsElementsAdmin({ transaction }: { transaction?: number }): Promise<CmsElementsProject[]> {
    return this.entityDAO.findAll({
      where:
      {
        [Op.or]: [
          { project_id: null },
          { project_id: this.context.project.id }
        ]
      },
      include: [
        {
          model: this.sequelizeDI.CmsElementsProject,
          as: "cms_element",
          required: false
        }
      ],
      transaction: this.getTran({ transaction })
    });
  }

  getCmsElements({ init, ids, is_active, transaction }: { init?: boolean; ids?: string[]; is_active?: boolean; transaction?: number }): Promise<CmsElementsProject[]> {
    let where: { project_id: string, id?: any, is_active?: boolean } = { project_id: this.context.project.id }
    if (init) {
      where.is_active = true
    }
    if (ids) {
      where.id = {
        [Op.in]: ids
      }
    }
    return this.entityDAO.findAll({
      where: where,
      include: [
        {
          model: this.sequelizeDI.CmsElementsProject,
          as: "cms_element"
        }
      ],
      transaction: this.getTran({ transaction })
    });
  }

}


export const CmsElementsProjectRepositoryPlugin = {
  pluginName: "cms-elements-project-repository",
  type: 'repository',
  di: 'cmsElementsProjectRepositoryDI',
  classType: CmsElementsProjectRepository
};