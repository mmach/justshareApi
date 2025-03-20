import {BaseService} from "../../Architecture/Base/baseService";


/**
 *
 * @export
 * @class CmsPagePrivilegesProjectService
 * @extends BaseService
 */
class CmsPagePrivilegesProjectService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork, actionProjectRepositoryDI:}}
   */
  constructor({ unitOfWorkDI }) {
    super({ unitOfWorkDI, repository: 'cmsPagePrivilegesProjectRepository' });
  }

}

export const CmsPagePrivilegesProjectServicePlugin = {
  pluginName: "cms-page-privileges-project-service",
  type: 'service',
  di: 'cmsPagePrivilegesProjectServiceDI',
  classType: CmsPagePrivilegesProjectService
} 
