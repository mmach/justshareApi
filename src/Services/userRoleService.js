// @ts-nocheck

import BaseService from "../Architecture/baseService.js";
import UnitOfWork from "../unitOfWork.js";

/**
 *
 * @export
 * @class UserService
 * @extends BaseService
 */
export default class UserRolesService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork}}
   */
  constructor({ unitOfWorkDI, userRepositoryDI }) {
    super({ unitOfWorkDI, repository: 'userRolesRepository' });
  }
}
