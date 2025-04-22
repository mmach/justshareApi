import { BaseRepositoryType } from "../../../Architecture";
import { ProcessChainActionInjectionDBO } from "../../../DBO";
import { ProcessChainActionInjection } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";
import { IProcessChainActionInjectionRepository } from "../processChainActionInjectionRepository";

export default class ProcessChainActionInjectionRepository  extends BaseRepositoryType<ProcessChainActionInjectionDBO, ProcessChainActionInjection> implements IProcessChainActionInjectionRepository {
  sequelizeDI: IMappsDbModels
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }) {
    super(sequelizeDI.ProcessChainActionInjection);
    this.sequelizeDI = sequelizeDI;
  }
}
export const ProcessChainActionInjectionRepositoryPlugin = {
  pluginName: "process-chain-action-injection-repository",
  type: 'repository',
  di: 'processChainActionInjectionRepositoryDI',
  classType: ProcessChainActionInjectionRepository
};