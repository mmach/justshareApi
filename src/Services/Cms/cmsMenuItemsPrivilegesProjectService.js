import {BaseService} from "../../Architecture/Base/baseService";


/**
 *
 * @export
 * @class CmsMenuItemsPrivilegesProjectService
 * @extends BaseService
 */
class CmsMenuItemsPrivilegesProjectService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork, actionProjectRepositoryDI:}}
   */
  constructor({ unitOfWorkDI }) {
    super({ unitOfWorkDI, repository: 'cmsMenuItemsPrivilegesProjectRepository' });
  }

}
export const CmsMenuItemsPrivilegesProjectServicePlugin = {
    pluginName: "cms-menu-items-privileges-project-service",
    type: 'service',
    di: 'cmsMenuItemsPrivilegesProjectServiceDI',
    classType: CmsMenuItemsPrivilegesProjectService
} 
