import {BaseService} from "../Architecture/Base/baseService";



/**
 *
 * @export
 * @class ActionService
 * @extends BaseService
 */
export default class LanguageService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork, actionPrivilegesRepositoryDI:}}
   */
  constructor({ unitOfWorkDI, actionPrivilegesRepositoryDI }) {
    super({ unitOfWorkDI, repository: 'languageRepository' });
  }
  async getLanguages({ }) {

    let result = await this.unitOfWorkDI.languageRepository.getLanguages({})
    return result;
  }

}
