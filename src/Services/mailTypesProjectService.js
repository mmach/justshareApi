import {BaseService} from "../Architecture/Base/baseService";
import SequelizeDB from "../Database/models/index.js";
import { UserDTO } from "justshare-shared";

/**
 *
 * @export
 * @class UserRepository
 * @extends BaseService
 */
export default class MailTypesProjectService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork, actionPrivilegesRepositoryDI:}}
   */
  constructor({ unitOfWorkDI, actionPrivilegesRepositoryDI }) {
    super({ unitOfWorkDI, repository: 'mailTypesProjectRepository' });
  }

  async getAll({ model }) {
    let result = await this.toJsonParse(this.unitOfWorkDI.mailTypesProjectRepository.getAll({model}))

    return result;
  }
}

