import { BaseServiceType, IBaseServiceType } from "../../../Architecture";
import { ActionsProjectDBO } from "../../../DBO";
import { DI } from "../../../diTypes";
import { ActionsProject } from "../../../Domain";
import { IActionProjectService } from "../actionProjectService";

class ActionProjectService extends BaseServiceType<ActionsProjectDBO, ActionsProject> implements IActionProjectService {
  constructor({ unitOfWorkDI }: DI) {
    super({ unitOfWorkDI, repository: 'actionProjectRepository' });
  }

  async getActions({ id }: { id: string }): Promise<ActionsProjectDBO[] | null> {
    let result = await this.toJsonParse<ActionsProjectDBO[]>(this.unitOfWorkDI.actionProjectRepository.getActions({ id }))
    return result;
  }
}



export const ActionProjectServicePlugin = {
  pluginName: "action-project-service",
  type: 'service',
  di: 'actionProjectServiceDI',
  classType: ActionProjectService
} 
