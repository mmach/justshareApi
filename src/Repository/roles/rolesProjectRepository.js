import {BaseRepository} from "../../Architecture/Base/baseRepository.js";
import SequelizeDB from "../../Database/models/index.js";
import { UserDTO } from "justshare-shared";

/**
 *
 * @export
 * @class UserRepository
 * @extends BaseRepository
 */
export default class RolesProjectRepository extends BaseRepository {
  /**
   * Creates an instance of UserRepository.
   * @param   {{sequelizeDI:SequelizeDB}}
   * @memberof UserRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.RolesProject);
    this.RolesProjectDB = sequelizeDI.RolesProject;
    this.sequelizeDI = sequelizeDI;
  }
  getRoles({ model, transaction }) {
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
          model: this.sequelizeDI.Roles,
          as: "role_detail",
        }




      ],
      transaction: this.getTran({ transaction })
    });
  }
}
