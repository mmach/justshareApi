import BaseService from "../Architecture/baseService.js";
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
    let result = await this.unitOfWorkDI.mailTypesProjectRepository.getAll({})

    return result;
  }
}

