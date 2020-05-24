import BaseRepository from "../Architecture/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";
import { UserDTO } from "justshare-shared";

/**
 *
 * @export
 * @class PrivilegeProjectRepository
 * @extends BaseRepository
 */
export default class DimensionsProjectRepository extends BaseRepository {
  /**
   * Creates an instance of UserRepository.
   * @param   {{sequelizeDI:SequelizeDB}}
   * @memberof PrivilegeProjectRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.DimensionsProject);
    this.sequelizeDI = sequelizeDI;
  }
  getDimensions({ transaction }) {
    return this.entityDAO.findAll({
      where:
      {
        project_id: this.context.project.id
      },
      include: [
        {
          model: this.sequelizeDI.Dimensions,
          as: "dimension_details"
          /* include: [{
             model: this.sequelizeDI.Category,
             as: "category_children"
           }
           ]*/
        },
        {
          model: this.sequelizeDI.Translations,
          as: "translation"
          /* include: [{
             model: this.sequelizeDI.Category,
             as: "category_children"
           }
           ]*/
        },
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
