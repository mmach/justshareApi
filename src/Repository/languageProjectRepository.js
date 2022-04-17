import BaseRepository from "../Architecture/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";
import { UserDTO } from "justshare-shared";

/**
 *
 * @export
 * @class LanguageProjectRepository
 * @extends BaseRepository
 */
export default class LanguageProjectRepository extends BaseRepository {
  /**
   * Creates an instance of UserRepository.
   * @param   {{sequelizeDI:SequelizeDB}}
   * @memberof PrivilegeProjectRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.LanguageProject);
    this.sequelizeDI = sequelizeDI;
  }


  async getProjectLanguages({ transaction }) {
    let where = {
      project_id: this.context.project.id,

    }

    return this.entityDAO.findAll({
      where: where,
      include: [
        {
          model: this.sequelizeDI.Language,
          as: "lang_details",
        }


      ],
      transaction: this.getTran({ transaction })
    });
  }

  async setAsMainLang({ model, transaction }) {
    let where = {}
    where.project_id = this.context.project.id
    await this.entityDAO.update({ is_main: false }, {
      where: where,
      transaction: this.getTran({ transaction })
    });
    where.language_id = model.id;
    await this.entityDAO.update({ is_main: true }, {
      where: where,
      transaction: this.getTran({ transaction }),
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
