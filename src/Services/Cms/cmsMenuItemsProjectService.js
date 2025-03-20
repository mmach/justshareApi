import {BaseService} from "../../Architecture/Base/baseService";


/**
 *
 * @export
 * @class CmsMenuItemsProjectService
 * @extends BaseService
 */
 class CmsMenuItemsProjectService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork, actionProjectRepositoryDI:}}
   */
  constructor({ unitOfWorkDI }) {
    super({ unitOfWorkDI, repository: 'cmsMenuItemsProjectRepository' });
  }

}

export const CmsMenuItemsProjectServicePlugin = {
    pluginName: "cms-menu-items-project-service",
    type: 'service',
    di: 'cmsMenuItemsProjectServiceDI',
    classType: CmsMenuItemsProjectService
} 
