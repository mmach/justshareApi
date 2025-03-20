import {BaseService} from "../../Architecture/Base/baseService";


/**
 *
 * @export
 * @class CmsMenuProjectService
 * @extends BaseService
 */
class CmsMenuProjectService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork, actionProjectRepositoryDI:}}
   */
  constructor({ unitOfWorkDI }) {
    super({ unitOfWorkDI, repository: 'cmsMenuProjectsRepository' });
  }

  async getCmsMenuAdmin({  }) {
    let result = await this.toJsonParse(this.unitOfWorkDI.cmsMenuProjectsRepository.getCmsMenuAdmin({  }))
    return result;
  }
  async getCmsMenu({ init, token }) {
    let result = await this.toJsonParse(this.unitOfWorkDI.cmsMenuProjectsRepository.getCmsMenu({ init, token  }))
    return result;
  }
}

export const CmsMenuProjectServicePlugin = {
    pluginName: "cms-menu-project-service",
    type: 'service',
    di: 'cmsMenuProjectServiceDI',
    classType: CmsMenuProjectService
} 
