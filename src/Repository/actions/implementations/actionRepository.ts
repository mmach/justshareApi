import { BaseRepositoryType } from "../../../Architecture/Base/baseRepositoryType.js";
import { ActionsDBO } from "../../../DBO/index.js";
import { Actions } from "../../../Domain/index.js";
import { IMappsDbModels } from "../../../Domain/models.js";
import { IActionRepository } from "../actionRepository.js";


export default class ActionRepository extends BaseRepositoryType<ActionsDBO, Actions> implements IActionRepository {
 
  sequelizeDI: IMappsDbModels;
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }) {
    super(sequelizeDI.Actions);
    this.sequelizeDI = sequelizeDI;
  }
 
  async getActions({ transaction }: { transaction?: number }): Promise<Actions[]> {
    return this.entityDAO.findAll({
      where: {},
      transaction: this.getTran({ transaction }) as any
    });
  }
}


export const ActionRepositoryPlugin = {
  pluginName: "action-repository",
  type: 'repository',
  di: 'actionRepositoryDI',
  classType: ActionRepository
};