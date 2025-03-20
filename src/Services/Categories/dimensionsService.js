import {BaseService} from "../../Architecture/Base/baseService";



/**
 *
 * @export
 * @class ActionService
 * @extends BaseService
 */
export default class DimensionsService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork, actionPrivilegesRepositoryDI:}}
   */
  constructor({ unitOfWorkDI, dimensionsRepositoryDI }) {
    super({ unitOfWorkDI, repository: 'dimensionsRepository' });
  }

  async getDimensions({ }) {
    let result = await this.unitOfWorkDI.dimensionsRepository.getDimensions({})

    return result;
  }

}




export const DimensionsServicePlugin = {
  pluginName: "dimension-service",
  type: 'service',
  di: 'dimensionsServiceDI',
  classType: DimensionsService
} 
