import BaseService from "../Architecture/baseService.js";


/**
 *
 * @export
 * @class CmsPagePrivilegesProjectService
 * @extends BaseService
 */
export default class CmsPagePrivilegesProjectService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork, actionProjectRepositoryDI:}}
   */
  constructor({ unitOfWorkDI }) {
    super({ unitOfWorkDI, repository: 'cmsPagePrivilegesProjectRepository' });
  }

}
