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
    super({ unitOfWorkDI, repository: 'cmsMenuProjectRepository' });
  }

  getCmsMenuAdmin({ id }) {

  }
  getCmsMenu({ init, token }) {

  }
}
