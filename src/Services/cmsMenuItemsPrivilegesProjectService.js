import BaseService from "../Architecture/baseService.js";


/**
 *
 * @export
 * @class CmsMenuItemsPrivilegesProjectService
 * @extends BaseService
 */
export default class CmsMenuItemsPrivilegesProjectService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork, actionProjectRepositoryDI:}}
   */
  constructor({ unitOfWorkDI }) {
    super({ unitOfWorkDI, repository: 'cmsMenuItemsPrivilegesProjectRepository' });
  }

}
