import BaseRepository from "../Architecture/baseRepository.js";
import SequelizeDB from "../Database/models/index.js";
import { UserDTO } from "justshare-shared";

/**
 *
 * @export
 * @class UserRepository
 * @extends BaseRepository
 */
export default class UserRepository extends BaseRepository {
  /**
   * Creates an instance of UserRepository.
   * @param   {{sequelizeDI:SequelizeDB}}
   * @memberof UserRepository
   */
  constructor({ sequelizeDI }) {
    super(sequelizeDI.Users);
    this.UserDB = sequelizeDI.Users;
    this.UserVDB = sequelizeDI.V_User
    this.sequelizeDI = sequelizeDI;
  }

  /**
   *
   *
   * @param {*} { user_id, transaction }
    * @return {Promise<UserDTO>}
    *  @memberof UserRepository
   */
  getUserInfo({ user_id, transaction }) {
    return this.UserVDB.findOne({
      where: {
        id: this.toStr(user_id)
      },
      include: [
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
  /**
   *
   * @param  {any} { email, transaction }
   * @return {Promise<UserDTO>}
   * @memberof UserRepository
   */
  checkMailInDb({ email, withoutAuth, transaction }) {
    let where = {
      email: this.toStr(email),
      is_authorized: true

    }
    if (withoutAuth == true) {
      where = {
        email: this.toStr(email)
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
          model: this.sequelizeDI.UserProjectPrivileges,
          as: "user_projects",
          required: false,
          include: [
            {
              model: this.sequelizeDI.Project,
              as: "project",
              required: true
            },
            {
              model: this.sequelizeDI.Privilege,
              as: "privilege",
              required: true
            }
          ],
        }
      ],
      transaction: this.getTran({ transaction })
    });
  }

  updateRefreshToken({ id, refresh_token, relogin_require, transaction }) {
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
  getByRefreshToken({ refresh_token, transaction }) {
    return this.entityDAO.findOne({
      where: {
        refresh_token: this.toStr(refresh_token),
        is_authorized: true
      },
      transaction: this.getTran({ transaction })
    });
  }

  authorizeUser({ uid, transaction }) {
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
