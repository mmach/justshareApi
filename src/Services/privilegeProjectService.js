import BaseService from "../Architecture/baseService.js";



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
