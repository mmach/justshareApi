import {BaseService} from "../../Architecture/Base/baseService";



/**
 *
 * @export
 * @class ActionService
 * @extends BaseService
 */
class ActionService extends BaseService {
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
export const ActionServicePlugin = {
    pluginName: "action-service",
    type: 'service',
    di: 'actionServiceDI',
    classType: ActionService
} 
