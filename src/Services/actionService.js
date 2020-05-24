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
export default class ActionService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork, actionRepositoryDI:}}
   */
  constructor({ unitOfWorkDI, actionRepositoryDI }) {
    super({ unitOfWorkDI, repository: 'actionRepository' });
  }
  /**
   *
   *
   * @param {{search,isFor}}
   * @memberof CategoryService
   */
  async getActions({  }) {
    let result = await this.unitOfWorkDI.actionRepository.getActions({  })

    return result;
  }

}
