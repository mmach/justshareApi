// @ts-nocheck

import {BaseService} from "../Architecture/Base/baseService";
import UnitOfWork from "../unitOfWork";

/**
 *
 * @export
 * @class UserService
 * @extends BaseService
 */
export default class UserTypesService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork}}
   */
  constructor({ unitOfWorkDI, userRepositoryDI }) {
    super({ unitOfWorkDI, repository: 'userTypesRepository' });
  }

  async getUserType({ model }) {
    return await this.toJsonParse(this.unitOfWorkDI.userTypesRepository.getUserType({ model: model }))
  }
}
