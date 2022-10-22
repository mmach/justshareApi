import BaseService from "../Architecture/baseService.js";



/**
 *
 * @export
 * @class ActionService
 * @extends BaseService
 */
export default class ActionPrivilegesService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork, actionPrivilegesRepositoryDI:}}
   */
  constructor({ unitOfWorkDI, actionPrivilegesRepositoryDI }) {
    super({ unitOfWorkDI, repository: 'actionPrivilegesRepository' });
  }


}
