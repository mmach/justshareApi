import { BaseRepositoryType } from "../../../Architecture";
import { ProcessChainPrivilegeDBO } from "../../../DBO";
import { ProcessChainPrivilege } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";
import { IProcessChainPrivilegesRepository } from "../processChainPrivilegesRepository";


export default class ProcessChainPrivilegesRepository extends BaseRepositoryType<ProcessChainPrivilegeDBO, ProcessChainPrivilege> implements IProcessChainPrivilegesRepository {
  sequelizeDI: IMappsDbModels
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }) {
    super(sequelizeDI.ProcessChainPrivilege);
    this.sequelizeDI = sequelizeDI;
  }
}


export const ProcessChainPrivilegesRepositoryPlugin = {
  pluginName: "process-chain-privileges-repository",
  type: 'repository',
  di: 'processChainPrivilegesRepositoryDI',
  classType: ProcessChainPrivilegesRepository
};