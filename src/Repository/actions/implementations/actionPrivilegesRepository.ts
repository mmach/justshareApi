
import { BaseRepositoryType } from "../../../Architecture";
import { ActionPrivilegesDBO } from "../../../DBO";
import { ActionPrivileges } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";
import { IActionPrivilegesRepository } from "../actionPrivilegesRepository";


export default class ActionPrivilegesRepository extends BaseRepositoryType<ActionPrivilegesDBO, ActionPrivileges> implements IActionPrivilegesRepository {
  sequelizeDI: IMappsDbModels;

  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }) {
    super(sequelizeDI.ActionPrivileges);
    this.sequelizeDI = sequelizeDI;
  }
}

export const ActionPrivilegesRepositoryPlugin = {
  pluginName: "action-privileges-repository",
  type: 'repository',
  di: 'actionPrivilegesRepositoryDI',
  classType: ActionPrivilegesRepository
} 
