// @ts-nocheck

import bcrypt from "bcryptjs";
import uuidv4 from "uuid/v4";
import BaseService from "../Architecture/baseService.js";
import { UserDTO, UserLoginInternalDTO, UserRegisterInternalDTO } from "justshare-shared";
import UnitOfWork from "../unitOfWork.js";
import ServerException from "../Architecture/Exceptions/serverException.js";
import UserRepository from "../Repository/userRepository.js";
import jwt from "jsonwebtoken";
import fs from "fs";
import CONFIG from "../config.js";

/**
 *
 * @export
 * @class ProjectService
 * @extends BaseService
 */
export default class ProjectService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork}}
   */
  constructor({ unitOfWorkDI, projectRepositoryDI }) {
    super({ unitOfWorkDI, repository: 'projectRepository' });
  }


  /**
   *
   *
   * @param {*} {project_id}
   * @returns UserDTO
   * @memberof ProjectService
   */
  async getProjectInfo({ project_id }) {
    return await this.toJsonParse(this.unitOfWorkDI.projectRepository.getProjectInfo({ project_id }));
  }

  /**
    *
    *
    * @param {*} {project_id}
    * @returns UserDTO
    * @memberof ProjectService
    */
  async authProject({ project_id, secretKey }) {
    let result = await this.toJsonParse(this.unitOfWorkDI.projectRepository.authProject({ project_id, secretKey }));
    if (result) {
      var expiresDate = new Date();
      expiresDate.setDate(expiresDate.getDate() + 1);

      let cert = fs.readFileSync("./cert.key");
      return {
        token: jwt.sign(
          {
            id: String(result.id).toLowerCase(),
            user_id: result.user_id
          },
          cert.toString("utf8"),
          { expiresIn: CONFIG.SECURITY.TOKEN_EXPIRATION }
        ),
        expiresIn: expiresDate,


        //,language:
      };
    } else {
      throw new ServerException().throw({
        code: "PROJECT_NOT_EXIST",
        type: "ERROR"
      });
    }
  }


}
