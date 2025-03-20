import {BaseService} from "../../Architecture/Base/baseService";



/**
 *
 * @export
 * @class ActionService
 * @extends BaseService
 */
class ActionProjectService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork, actionProjectRepositoryDI:}}
   */
  constructor({ unitOfWorkDI, actionProjectRepositoryDI }) {
    super({ unitOfWorkDI, repository: 'actionProjectRepository' });
  }

  async getActions({ id }) {
    let result = await this.toJsonParse(this.unitOfWorkDI.actionProjectRepository.getActions({ id }))

    return result;
  }
}

export const ActionProjectServicePlugin = {
    pluginName: "action-project-service",
    type: 'service',
    di: 'actionProjectServiceDI',
    classType: ActionProjectService
} 
