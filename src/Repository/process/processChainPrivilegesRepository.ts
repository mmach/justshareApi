import { IBaseRepositoryType } from "../../Architecture";
import { ProcessChainPrivilegeDBO } from "../../DBO";
import { ProcessChainPrivilege } from "../../Domain";




export interface IProcessChainPrivilegesRepository
  extends IBaseRepositoryType<ProcessChainPrivilegeDBO, ProcessChainPrivilege> { }
