import { BaseRepositoryType } from "../../../Architecture";
import { StatusActionsDBO } from "../../../DBO";
import { StatusActions } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";
import { IStatusActionsRepository } from "../statusActionsRepository.js";


export default class StatusActionsRepository extends BaseRepositoryType<StatusActionsDBO, StatusActions> implements IStatusActionsRepository {
  sequelizeDI: IMappsDbModels
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }) {
    super(sequelizeDI.StatusActions);
    this.sequelizeDI = sequelizeDI;
  }
  deleteStatus({ action_id, status_id, transaction }:
    { action_id: string, status_id: string, transaction?: number }): Promise<number> {
    return this.entityDAO.destroy({
      where: {
        action_id: this.toStr(action_id),
        status_id: this.toStr(status_id)
      },
      transaction: this.getTran({ transaction })
    });
  }
}


export const StatusActionsRepositoryPlugin = {
  pluginName: "status-actions-repository",
  type: 'repository',
  di: "statusActionsRepositoryDI",
  classType: StatusActionsRepository
};