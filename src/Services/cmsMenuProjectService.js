import BaseService from "../Architecture/baseService.js";


/**
 *
 * @export
 * @class CmsMenuProjectService
 * @extends BaseService
 */
export default class CmsMenuProjectService extends BaseService {
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
