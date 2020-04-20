import BaseRepository from "../Architecture/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";
import { UserDTO } from "justshare-shared";

/**
 *
 * @export
 * @class ProjectRepository
 * @extends BaseRepository
 */
export default class ProjectRepository extends BaseRepository {
  /**
   * Creates an instance of ProjectRepository.
   * @param   {{sequelizeDI:SequelizeDB}}
   * @memberof ProjectRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.Project);
    this.ProjectDB = sequelizeDI.Project;
    //this.UserVDB = sequelizeDI.V_User
    this.sequelizeDI = sequelizeDI;
  }

  /**
   *
   *
   * @param {*} { user_id, transaction }
    * @return {Promise<UserDTO>}
    *  @memberof UserRepository
   */
  getProjectInfo({ project_id, transaction }) {
    return this.ProjectDB.findOne({
      where: {
        id: this.toStr(project_id)
      },
      transaction: this.getTran({ transaction })
    })
  }

  authProject({ project_id, secretKey, transaction }) {
    return this.entityDAO.findOne(

      {
        where: {
          id: this.toStr(project_id),
          secretKey: this.toStr(secretKey)
        },
        transaction: this.getTran({ transaction })
      }
    );
  }
}
