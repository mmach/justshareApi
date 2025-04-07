import { Op } from "sequelize";
import { BaseRepositoryType } from "../../../Architecture";
import { CmsPagesProjectsDBO } from "../../../DBO";
import { CmsPagesProjects } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";
import { ICmsPageProjectsRepository } from "../cmsPageProjectsRepository";


export default class CmsPageProjectsRepository extends BaseRepositoryType<CmsPagesProjectsDBO, CmsPagesProjects> implements ICmsPageProjectsRepository {
  sequelizeDI: IMappsDbModels
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }) {
    super(sequelizeDI.CmsPageProjects);
    this.sequelizeDI = sequelizeDI;
  }

  getCmsPagesAdmin({ transaction }: { transaction?: number }): Promise<CmsPagesProjects[]> {
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
          model: this.sequelizeDI.Translations,
          as: "translation",
          required: false,
        },
        {
          model: this.sequelizeDI.CmsPagePrivilegesProjects,
          as: "page_privileges",
          required: false,
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
      transaction: this.getTran({ transaction })
    });
  }


  getCmsPages({ transaction }: { transaction?: number }): Promise<CmsPagesProjects[]> {
    return this.entityDAO.findAll({
      where:
      {
        is_active: true,
        [Op.or]: [
          { project_id: null },
          { project_id: this.context.project.id }
        ]
      },
      include: [
        {
          model: this.sequelizeDI.Translations,
          as: "translation",
          required: false,
        },
        {
          model: this.sequelizeDI.CmsPagePrivilegesProjects,
          as: "page_privileges",
          required: false,
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
      transaction: this.getTran({ transaction })
    });
  }
}


export const CmsPageProjectsRepositoryPlugin = {
  pluginName: "cms-page-projects-repository",
  type: 'repository',
  di: 'cmsPageProjectsRepositoryDI',
  classType: CmsPageProjectsRepository
};