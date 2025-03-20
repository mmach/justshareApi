import {BaseService} from "../../Architecture/Base/baseService";


/**
 *
 * @export
 * @class CmsMenuProjectService
 * @extends BaseService
 */
class CmsPageProjectService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork, actionProjectRepositoryDI:}}
   */
  constructor({ unitOfWorkDI }) {
    super({ unitOfWorkDI, repository: 'cmsPageProjectsRepository' });
  }


  async getCmsPage({ }) {
    let result = await this.toJsonParse(this.unitOfWorkDI.cmsPageProjectsRepository.getCmsPages({}))
    return result;
  }

  async getCmsPageAdmin({ }) {
    let result = await this.toJsonParse(this.unitOfWorkDI.cmsPageProjectsRepository.getCmsPagesAdmin({}))
    return result;
  }
}

export const CmsPageProjectServicePlugin = {
    pluginName: "cms-page-project-service",
    type: 'service',
    di: 'cmsPageProjectServiceDI',
    classType: CmsPageProjectService
} 
