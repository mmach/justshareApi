import BaseService from "../Architecture/baseService.js";



/**
 *
 * @export
 * @class ActionService
 * @extends BaseService
 */
export default class PrivilegeService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork, actionPrivilegesRepositoryDI:}}
   */
  constructor({ unitOfWorkDI, actionPrivilegesRepositoryDI }) {
    super({ unitOfWorkDI, repository: 'privilegeRepository' });
  }

  async getPrivileges({  }) {
    let result = await this.unitOfWorkDI.privilegeRepository.getPrivileges({  })

    return result;
  }

}
