import BaseService from "../Architecture/baseService.js";
import fs from "fs-extra";
import ServerException from "../Architecture/Exceptions/serverException.js";
import CONFIG from "../config.js";
import uuidv4 from "uuid/v4";



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

  async getCmsElements({ }) {
    let result = await this.toJsonParse(this.unitOfWorkDI.cmsElementsProjectRepository.getCmsElements({}))

    return result;
  }

  async getDimensionsFlat({ init, ids }) {
    let result = await this.toJsonParse(this.unitOfWorkDI.cmsElementsProjectRepository.getCmsElements({ init, ids, is_active: true }))
    result = result.map(item => {
      return {
        token: item.token || item.cms_element.token,
        cms: item.cms || item.cms_element.cms,
        load_on_init: item.cms_element.load_on_init,
        id: item.id
      }
    });
    return result;
  }

}
