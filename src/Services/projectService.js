// @ts-nocheck

import bcrypt from "bcryptjs";
import fs from "fs";
import jwt from "jsonwebtoken";
import {BaseService} from "../Architecture/Base/baseService";
import {ServerException} from "../Architecture/Exceptions/serverException.js";
import CONFIG from "../config.js";
import UnitOfWork from "../unitOfWork";

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
  async authProject({ project_id, secretKey, authBySensorMac }) {
    
    let result = await this.toJsonParse(this.unitOfWorkDI.projectRepository.authProject({ project_id, secretKey,authBySensorMac }));
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
        socketChannel: bcrypt.hashSync(project_id, result.salt).replace(result.salt, '')

      };
    } else {
      throw new ServerException().throw({
        code: "PROJECT_NOT_EXIST",
        type: "ERROR"
      });
    }
  }

  async getProjectsSockets({ }) {
    let result = await this.toJsonParse(this.unitOfWorkDI.projectRepository.getProjectsSockets({}));
    return result.map(i => {
      return { id: i.id, socket: bcrypt.hashSync(i.id, i.salt).replace(i.salt, '') }
    })
  }
  async getProjectSocketChannel({ project_id }) {
    let result = await this.toJsonParse(this.unitOfWorkDI.projectRepository.getProjectsSockets({}));
    return result.filter(i => i.id == project_id).map(i => {
      let sock = bcrypt.hashSync(i.id, i.salt).replace(i.salt, '');
      let socket = Buffer.from(sock).toString('base64').replace(/=/g, '')

      return { id: i.id, socket: `/socket_${socket}` }
    })[0]
  }


  async getProjctInfo({ id }) {
    let result = await this.toJsonParse(this.unitOfWorkDI.projectRepository.getProjectDetails({ id }));
    return result
  }

  async getProjctUsers({ }) {
    let result = await this.toJsonParse(this.unitOfWorkDI.projectRepository.getProjctUsers({}));
    return result
  }


}
