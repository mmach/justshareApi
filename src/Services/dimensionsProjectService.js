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
export default class DimensionsProjectService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork, actionProjectRepositoryDI:}}
   */
  constructor({ unitOfWorkDI, dimensionsProjectRepositoryDI }) {
    super({ unitOfWorkDI, repository: 'dimensionsProjectRepository' });
  }

  async getDimensions({  }) {
    let result = await this.unitOfWorkDI.dimensionsProjectRepository.getDimensions({  })

    return result;
  }


}
