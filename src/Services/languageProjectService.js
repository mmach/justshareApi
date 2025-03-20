import {BaseService} from "../Architecture/Base/baseService";



/**
 *
 * @export
 * @class ActionService
 * @extends BaseService
 */
export default class LanguageProjectService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork, actionPrivilegesRepositoryDI:}}
   */
  constructor({ unitOfWorkDI, actionPrivilegesRepositoryDI }) {
    super({ unitOfWorkDI, repository: 'languageProjectRepository' });
  }

  async getProjectLanguages() {
    return await this.toJsonParse(this.unitOfWorkDI.languageProjectRepository.getProjectLanguages({}))
  }


  async setAsMainLang({ model }) {

    await this.unitOfWorkDI.languageProjectRepository.setAsMainLang({
      model
    })

  }
}
