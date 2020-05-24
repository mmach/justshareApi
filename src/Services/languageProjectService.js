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
