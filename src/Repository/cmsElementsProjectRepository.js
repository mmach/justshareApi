import { Op } from "sequelize";
import BaseRepository from "../Architecture/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";
import { UserDTO } from "justshare-shared";

/**
 *
 * @export
 * @class PrivilegeProjectRepository
 * @extends BaseRepository
 */
export default class CmsElementsProjectRepository extends BaseRepository {
  /**
   * Creates an instance of UserRepository.
   * @param   {{sequelizeDI:SequelizeDB}}
   * @memberof PrivilegeProjectRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.CmsElementsProject);
    this.sequelizeDI = sequelizeDI;
  }
  getCmsElementsAdmin({ transaction }) {
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

  getCmsElements({ init, ids, is_active, transaction }) {
    let where = { project_id: this.context.project.id }
    if (init) {
      where.is_active = true
    }
    if (ids) {
      where.id = {
        [SequelizeDB.Sequelize.Op.in]: ids
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
