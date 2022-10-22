import BaseService from "../Architecture/baseService.js";



/**
 *
 * @export
 * @class ActionService
 * @extends BaseService
 */
export default class RoleProjectService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork, actionProjectRepositoryDI:}}
   */
  constructor({ unitOfWorkDI, actionProjectRepositoryDI }) {
    super({ unitOfWorkDI, repository: 'rolesProjectRepository' });
  }
  async getRoles({ model }) {
    return await this.toJsonParse(this.unitOfWorkDI.rolesProjectRepository.getRoles({ model: model }))

  }

}
