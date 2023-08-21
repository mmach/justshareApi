import BaseService from "../Architecture/baseService.js";



/**
 *
 * @export
 * @class ActionService
 * @extends BaseService
 */
export default class CmsElementsProjectService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork, actionProjectRepositoryDI:}}
   */
  constructor({ unitOfWorkDI }) {
    super({ unitOfWorkDI, repository: 'cmsElementsProjectRepository' });
  }

  async getCmsElementsAdmin({ }) {
    let result = await this.toJsonParse(this.unitOfWorkDI.cmsElementsProjectRepository.getCmsElementsAdmin({}))
    return result;
  }

  async getCmsElements({ }) {
    let result = await this.toJsonParse(this.unitOfWorkDI.cmsElementsProjectRepository.getCmsElements({}))
    return result;
  }

  async getCmsElementsFlat({ init, ids }) {
    let result = await this.toJsonParse(this.unitOfWorkDI.cmsElementsProjectRepository.getCmsElements({ init, ids, is_active: true }))
    result = result.map(item => {
      return {
        token: item.token || (item.cms_element && item.cms_element.token),
        cms: item.cms || (item.cms_element && item.cms_element.cms),
        load_on_init: item.cms_element && item.cms_element.load_on_init,
        id: item.id
      }
    });
    return result;
  }

}
