import { BaseRepositoryType } from "../../../Architecture";
import { ProcessChainStateDBO } from "../../../DBO";
import { ProcessChainState } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";



export default class ProcessChainStateRepository extends BaseRepositoryType<ProcessChainStateDBO, ProcessChainState> {
  sequelizeDI: IMappsDbModels
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }) {
    super(sequelizeDI.ProcessChainState);
    this.sequelizeDI = sequelizeDI;
  }
}

export const ProcessChainStateRepositoryPlugin = {
  pluginName: "process-chain-state-repository",
  type: 'repository',
  di: 'processChainStateRepositoryDI',
  classType: ProcessChainStateRepository
};