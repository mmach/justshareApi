import {BaseService} from "../Architecture/Base/baseService";



/**
 *
 * @export
 * @class ActionService
 * @extends BaseService
 */
export default class RoleService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork, actionRepositoryDI:}}
   */
  constructor({ unitOfWorkDI, actionRepositoryDI }) {
    super({ unitOfWorkDI, repository: 'rolesRepository' });
  }

  async getRoles({ }) {
    let result = await this.unitOfWorkDI.rolesRepository.getRoles({})

    return result;
  }
}
