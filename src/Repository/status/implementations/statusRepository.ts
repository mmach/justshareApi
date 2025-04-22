import { BaseRepositoryType } from "../../../Architecture";
import { StatusDBO } from "../../../DBO";
import { Status } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";
import { IStatusRepository } from "../statusRepository";


export default class StatusRepository extends BaseRepositoryType<StatusDBO, Status> implements IStatusRepository {
  sequelizeDI: IMappsDbModels
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }) {
    super(sequelizeDI.Status);
    this.sequelizeDI = sequelizeDI;
  }

  getGlobalStatuses({ name, transaction }: { name: string, transaction?: number }): Promise<Status[]> {
    return this.entityDAO.findAll({
      transaction: this.getTran({ transaction })
    });
  }

}


export const StatusRepositoryPlugin = {
  pluginName: "status-repository",
  type: 'repository',
  di: 'statusRepositoryDI',
  classType: StatusRepository
};