import BaseService from "../Architecture/baseService.js";



/**
 *
 * @export
 * @class ActionService
 * @extends BaseService
 */
export default class ActionProjectService extends BaseService {
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
