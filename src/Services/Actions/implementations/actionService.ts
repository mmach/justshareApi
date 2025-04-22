
import { IActionService } from "..";
import { BaseServiceType } from "../../../Architecture";
import { ActionsDBO } from "../../../DBO";
import { DI } from "../../../diTypes";
import { Actions } from "../../../Domain";



class ActionService extends BaseServiceType<ActionsDBO, Actions> implements IActionService {
  constructor({ unitOfWorkDI }: DI) {
    super({ unitOfWorkDI, repository: 'actionRepository' });
  }
 
  async getActions({  }: {  }): Promise<Actions[]> {
    let result = await this.unitOfWorkDI.actionRepository.getActions({  })
    return result;
  }

}

export const ActionServicePlugin = {
    pluginName: "action-service",
    type: 'service',
    di: 'actionServiceDI',
    classType: ActionService
} 
