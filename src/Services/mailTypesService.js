import SequelizeDB from "../Database/models/index.js";
import { UserDTO } from "justshare-shared";
import {BaseService} from "../Architecture/Base/baseService";


/**
 *
 * @export
 * @class UserRepository
 * @extends BaseService
 */
export default class MailTypesService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork, actionPrivilegesRepositoryDI:}}
   */
  constructor({ unitOfWorkDI, mailTypesRepositoryDI }) {
    super({ unitOfWorkDI, repository: 'mailTypesRepository' });
  }

  async getAll({ model }) {
    let result = await this.unitOfWorkDI.mailTypesRepository.getAll({})

    return result;
  }
}

