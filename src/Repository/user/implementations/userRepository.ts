import { ModelStatic } from "sequelize";
import { BaseRepositoryType } from "../../../Architecture";
import { UsersDBO } from "../../../DBO";
import { Users, vUser } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";
import { IUserRepository } from "../userRepository";

export default class UserRepository extends BaseRepositoryType<UsersDBO, Users> implements IUserRepository {
  sequelizeDI: IMappsDbModels
  UserDB: ModelStatic<Users>
  UserVDB: ModelStatic<vUser>
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }) {
    super(sequelizeDI.Users);
    this.UserDB = sequelizeDI.Users;
    this.UserVDB = sequelizeDI.V_User
    this.sequelizeDI = sequelizeDI;
  }

  getUserInfo({ user_id, transaction }: { user_id: string, transaction?: number }): Promise<vUser | null> {
    return this.UserVDB.findOne({
      where: {
        id: this.toStr(user_id)
      },
      include: [
        {
          model: this.sequelizeDI.UserTypes,
          as: "user_type",
          //required: false
        },
        {
          model: this.sequelizeDI.UserRoles,
          as: "user_roles",
          // required: true,
          include: [
            {
              model: this.sequelizeDI.RolesProject,
              as: "roles",
              //required: true,
              include: [
                {
                  model: this.sequelizeDI.Roles,
                  as: "role_detail",
                  // required: true
                }]
            },


          ]
        },
        {
          model: this.sequelizeDI.Blob,
          as: "blob_profile",
          required: false,
          include: [
            {
              model: this.sequelizeDI.BlobMapper,
              as: "blob_item",
              required: true
            },
            {
              model: this.sequelizeDI.BlobMapper,
              as: "blob_thumbmail",
              required: true
            }
          ],
        },

      ],
      transaction: this.getTran({ transaction })
    })
  }


  getUsersProject({ transaction }: { transaction?: number }): Promise<vUser[]> {

    return this.UserVDB.findAll({
      where: {
        email: this.context.user.email
      }
      , include: [

        {
          model: this.sequelizeDI.V_Project,
          as: "project",
          required: false
        },
        {
          model: this.sequelizeDI.UserTypes,
          as: "user_type",
          required: false
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
      ],
      transaction: this.getTran({ transaction })
    });
  }

  checkMailInDb({ email, withoutAuth, usertypeId, transaction }: { email: string, withoutAuth?: boolean, usertypeId?: string, transaction?: number }): Promise<Users | null> {
    let where: Partial<UsersDBO> = {
      email: this.toStr(email),
      is_authorized: true,
      project_id: this.context.project.id
    }
    if (withoutAuth == true) {
      where = {
        email: this.toStr(email),
        project_id: this.context.project.id

      }
    }
    return this.entityDAO.findOne({
      where: where
      , include: [
        {
          model: this.sequelizeDI.UserAuths,
          as: "user_auths",
          required: false
        },
        {
          model: this.sequelizeDI.UserTypes,
          as: "user_type",
          required: false
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
      ],
      transaction: this.getTran({ transaction })
    });
  }

  updateRefreshToken({ id, refresh_token, relogin_require, transaction }: { id: string, refresh_token: string, relogin_require: boolean, transaction?: number }): Promise<any> {
    return this.entityDAO.update(
      {
        refresh_token: this.toStr(refresh_token),
        relogin_require: this.toStr(relogin_require)
      },
      {
        where: { id: this.toStr(id) },
        transaction: this.getTran({ transaction })
      }
    );
  }

  getByRefreshToken({ refresh_token, transaction }: { refresh_token: string, transaction?: number }): Promise<Users | null> {
    return this.entityDAO.findOne({
      where: {
        refresh_token: this.toStr(refresh_token),
        is_authorized: true
      },
      transaction: this.getTran({ transaction })
    });
  }

  authorizeUser({ uid, transaction }: { uid: string, transaction?: number }): Promise<any> {
    return this.entityDAO.update(
      {
        is_authorized: true
      },
      {
        where: { uid: this.toStr(uid) },
        transaction: this.getTran({ transaction })
      }
    );
  }
}



export const UserRepositoryPlugin = {
  pluginName: "user-repository",
  type: 'repository',
  di: 'userRepositoryDI',
  classType: UserRepository
};