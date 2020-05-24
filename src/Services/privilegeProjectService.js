import BaseService from "../Architecture/baseService.js";
import fs from "fs-extra";
import ServerException from "../Architecture/Exceptions/serverException.js";
import CONFIG from "../config.js";
import uuidv4 from "uuid/v4";



/**
 *
 * @export
 * @class ActionService
 * @extends BaseService
 */
export default class PrivilegeProjectService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork, actionProjectRepositoryDI:}}
   */
  constructor({ unitOfWorkDI, actionProjectRepositoryDI }) {
    super({ unitOfWorkDI, repository: 'privilegeProjectRepository' });
  }

  async getPrivileges({  }) {
    let result = await this.unitOfWorkDI.privilegeProjectRepository.getPrivileges({  })

    return result;
  }


}
