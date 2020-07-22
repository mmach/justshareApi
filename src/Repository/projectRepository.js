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
    this.V_ProjectDB = sequelizeDI.V_Project
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



  /**
  *
  *
  * @param {*} { user_id, transaction }
   * @return {Promise<UserDTO>}
   *  @memberof UserRepository
  */
  getProjectInfo({ project_id, transaction }) {
    return this.V_ProjectDB.findOne({
      where: {
        id: this.toStr(project_id)
      },
      transaction: this.getTran({ transaction })
    })
  }
  getProjectDetails({ id, transaction }) {
    return this.V_ProjectDB.findOne({
      where: {
        id: this.toStr(id)
      },
      include: [
        {
          model: this.sequelizeDI.V_User,
          required: false,
          as: "owner"
        },
        {
          model: this.sequelizeDI.Blob,
          required: false,
          as: "logo"
        },
        {
          model: this.sequelizeDI.Blob,
          required: false,
          as: "logo_hor"
        },
        {
          model: this.sequelizeDI.Blob,
          required: false,
          as: "logo_ver"
        },
        {
          model: this.sequelizeDI.Blob,
          required: false,
          as: "img_main"
        },
        {
          model: this.sequelizeDI.Blob,
          required: false,
          as: "img_main_phone"
        },

      ],
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
  getProjectsSockets({ transaction }) {
    return this.entityDAO.findAll(
      {
        attributes: ['salt', 'id'],
        transaction: this.getTran({ transaction })
      }
    );
  }

  getProjctUsers({ transaction }) {
    return this.V_ProjectDB.findOne({
      where: {
        id: this.toStr(this.context.project.id)
      },
      include: [
        {
          model: this.sequelizeDI.V_User,
          required: false,
          as: "users",
          include: [
            {
              model: this.sequelizeDI.UserTypes,
              required: false,
              as: "user_type",
            },
            {
              model: this.sequelizeDI.UserRoles,
              as: "user_roles",
              required: false,
              include: [
                {
                  model: this.sequelizeDI.RolesProject,
                  as: "roles",
                  required: true,
                  include: [
                    {
                      model: this.sequelizeDI.Roles,
                      as: "role_detail",
                      required: true
                    }
                  ],
                }
              ],
            }
          ]
        },

      ],
      transaction: this.getTran({ transaction })
    })
  }

}

