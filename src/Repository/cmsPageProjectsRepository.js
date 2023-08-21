import { Op } from "sequelize";
import BaseRepository from "../Architecture/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";
import { UserDTO } from "justshare-shared";

/**
 *
 * @export
 * @class CmsPageProjectsRepository
 * @extends BaseRepository
 */
export default class CmsPageProjectsRepository extends BaseRepository {
  /**
   * Creates an instance of UserRepository.
   * @param   {{sequelizeDI:SequelizeDB}}
   * @memberof CmsMenuProjectsRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.CmsPageProjects);
    this.sequelizeDI = sequelizeDI;
  }

  getCmsPagesAdmin({ transaction }) {
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


  getCmsPages({ transaction }) {
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
