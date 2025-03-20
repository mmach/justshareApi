import {BaseService} from "../../Architecture/Base/baseService";



/**
 *
 * @export
 * @class ActionService
 * @extends BaseService
 */
export default class ActionPrivilegesService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork, actionPrivilegesRepositoryDI:}}
   */
  constructor({ unitOfWorkDI, actionPrivilegesRepositoryDI }) {
    super({ unitOfWorkDI, repository: 'actionPrivilegesRepository' });
  }
  

}
export const ActionPrivilegesServicePlugin = {
  pluginName: "action-privileges-service",
  type: 'service',
  di: 'actionPrivilegesServiceDI',
  classType: ActionPrivilegesService
} 
