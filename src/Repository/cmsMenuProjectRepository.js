import { Op } from "sequelize";
import BaseRepository from "../Architecture/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";
import { UserDTO } from "justshare-shared";

/**
 *
 * @export
 * @class CmsMenuProjectsRepository
 * @extends BaseRepository
 */
export default class CmsMenuProjectsRepository extends BaseRepository {
  /**
   * Creates an instance of UserRepository.
   * @param   {{sequelizeDI:SequelizeDB}}
   * @memberof CmsMenuProjectsRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.CmsMenuProjects);
    this.sequelizeDI = sequelizeDI;
  }

  getCmsMenuAdmin({ transaction }) {
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
  getCmsMenu({ init, token, transaction }) {
    let query = {

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
          required: false
        }
      ],
      transaction: this.getTran({ transaction })
    });
  }
}
