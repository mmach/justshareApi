import { Op } from "sequelize";
import { BaseRepositoryType } from "../../../Architecture";
import { CmsMenuProjectsDBO } from "../../../DBO";
import { CmsMenuProjects } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";
import { ICmsMenuProjectsRepository } from "../cmsMenuProjectRepository";


export default class CmsMenuProjectsRepository extends BaseRepositoryType<CmsMenuProjectsDBO, CmsMenuProjects> implements ICmsMenuProjectsRepository {
  sequelizeDI: IMappsDbModels
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }) {
    super(sequelizeDI.CmsMenuProjects);
    this.sequelizeDI = sequelizeDI;
  }

  getCmsMenuAdmin({ transaction }: { transaction?: number }): Promise<CmsMenuProjects[]> {
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
          model: this.sequelizeDI.CmsMenuItemsProjects,
          as: "menu_items",
          required: false,
          order: [['sort_order', 'ASC']],
          include: [
            {
              model: this.sequelizeDI.Translations,
              as: "translation",
              required: false,
            },
            {
              model: this.sequelizeDI.CmsMenuItemsPrivilegesProjects,
              as: "menu_item_privileges",
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
        }
      ],
      transaction: this.getTran({ transaction })
    });
  }
  getCmsMenu({ token, transaction }: { token?: string; transaction?: number }): Promise<CmsMenuProjects[]> {
    let query: { token?: string, load_on_init?: boolean } = {

    }
    if (token) {
      query.token = token
    } else {
      query.load_on_init = true
    }
    return this.entityDAO.findAll({
      where:
      {
        is_active: true,
        [Op.or]: [
          { project_id: null },
          { project_id: this.context.project.id }
        ],
        ...query

      },
      include: [
        {
          model: this.sequelizeDI.CmsMenuItemsProjects,
          as: "menu_items",
          required: false,
          order: [['sort_order', 'ASC']],
          include: [
            {
              model: this.sequelizeDI.Translations,
              as: "translation",
              required: false,
            },
            {
              model: this.sequelizeDI.CmsMenuItemsPrivilegesProjects,
              as: "menu_item_privileges",
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
        }
      ],
      transaction: this.getTran({ transaction })
    });
  }
}



export const CmsMenuProjectsRepositoryPlugin = {
  pluginName: "cms-menu-projects-repository",
  type: 'repository',
  di: 'cmsMenuProjectsRepositoryDI',
  classType: CmsMenuProjectsRepository
};