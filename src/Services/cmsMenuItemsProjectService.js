import BaseService from "../Architecture/baseService.js";


/**
 *
 * @export
 * @class CmsMenuItemsProjectService
 * @extends BaseService
 */
export default class CmsMenuItemsProjectService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork, actionProjectRepositoryDI:}}
   */
  constructor({ unitOfWorkDI }) {
    super({ unitOfWorkDI, repository: 'cmsMenuItemsProjectRepository' });
  }

}
