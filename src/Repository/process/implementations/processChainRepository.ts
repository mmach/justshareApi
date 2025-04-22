import { BaseRepositoryType } from "../../../Architecture";
import { ProcessChainDBO } from "../../../DBO";
import { ProcessChain } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";
import { IProcessChainRepository } from "../processChainRepository";


export default class ProcessChainRepository extends BaseRepositoryType<ProcessChainDBO, ProcessChain>  implements IProcessChainRepository {
  sequelizeDI: IMappsDbModels
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }) {
    super(sequelizeDI.ProcessChain);
    this.sequelizeDI = sequelizeDI;
  }
}


export const ProcessChainRepositoryPlugin = {
  pluginName: "process-chain-repository",
  type: 'repository',
  di: 'processChainRepositoryDI',
  classType: ProcessChainRepository
};