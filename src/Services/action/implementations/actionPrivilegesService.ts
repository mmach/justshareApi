import { BaseServiceType } from "../../../Architecture";
import { ActionPrivilegesDBO } from "../../../DBO";
import { DI } from "../../../diTypes";
import { ActionPrivileges } from "../../../Domain";
import { IActionPrivilegesService } from "../actionPrivilegesService";


export default class ActionPrivilegesService extends BaseServiceType<ActionPrivilegesDBO, ActionPrivileges> implements IActionPrivilegesService {
  constructor({ unitOfWorkDI }: DI) {
    super({ unitOfWorkDI, repository: 'actionPrivilegesRepository' });
  }
}

export const ActionPrivilegesServicePlugin = {
  pluginName: "action-privileges-service",
  type: 'service',
  di: 'actionPrivilegesServiceDI',
  classType: ActionPrivilegesService
} 
