import {BaseRepository} from "../Architecture/Base/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";
import { UserDTO } from "justshare-shared";

/**
 *
 * @export
 * @class ActionRepository
 * @extends BaseRepository
 */
export default class StatusProjectsRepository extends BaseRepository {
  /**
   * Creates an instance of UserRepository.
   * @param   {{sequelizeDI:SequelizeDB}}
   * @memberof ActionRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.StatusProjects);
    this.sequelizeDI = sequelizeDI;
  }

  getByProjectStatuses({ transaction }) {
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
  getByToken({ name, transaction }) {
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
  getByStatusId({ id, transaction }) {
    return this.entityDAO.findOne({
      where: {
        project_id: this.context.project.id,
        id:id
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



