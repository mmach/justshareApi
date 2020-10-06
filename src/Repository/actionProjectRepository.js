import BaseRepository from "../Architecture/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";
import { UserDTO } from "justshare-shared";

/**
 *
 * @export
 * @class ActionProjectRepository
 * @extends BaseRepository
 */
export default class ActionProjectRepository extends BaseRepository {
  /**
   * Creates an instance of UserRepository.
   * @param   {{sequelizeDI:SequelizeDB}}
   * @memberof ActionProjectRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.ActionsProject);
    this.sequelizeDI = sequelizeDI;
  }
  async getActions({ id, transaction }) {

    let where = { project_id: this.context.project.id };
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
      transaction: this.getTran({ transaction })
    });

  }
  /* getPrivByName({ name, transaction }) {
     return this.entityDAO.findOne({
       where:
       {
         name: name,
         status: 1
       },
       transaction: this.getTran({ transaction })
     });
   }*/

}
