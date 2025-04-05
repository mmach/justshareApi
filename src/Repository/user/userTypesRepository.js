import {BaseRepository} from "../../Architecture/Base/baseRepository.js";
import SequelizeDB from "../../Database/models/index.js";
import { UserDTO } from "justshare-shared";

/**
 *
 * @export
 * @class UserRepository
 * @extends BaseRepository
 */
export default class UserTypesRepository extends BaseRepository {

  /**
   * Creates an instance of UserRepository.
   * @param   {{sequelizeDI:SequelizeDB}}
   * @memberof UserRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.UserTypes);
    this.UserTypesDB = sequelizeDI.UserTypes
    this.sequelizeDI = sequelizeDI;
  }
  getUserType({ model, transaction }) {
    let where = {
      project_id: this.context.project.id,

    }
    console.log(model);
    if (model.id) {
      where.id = model.id
    }
    return this.entityDAO.findAll({
      where: where,
      include: [
        {
          model: this.sequelizeDI.UserTypeRoles,
          as: "usertype_roles",
          include: [
            {
              model: this.sequelizeDI.RolesProject,
              as: "roles",
              include: [
                {
                  model: this.sequelizeDI.Roles,
                  as: "role_detail",
                }
              ]
            }
          ]
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
        }



        /* include: [{
           model: this.sequelizeDI.Category,
           as: "category_parent"
         }
         ]*/

      ],
      transaction: this.getTran({ transaction })
    });
  }

}
