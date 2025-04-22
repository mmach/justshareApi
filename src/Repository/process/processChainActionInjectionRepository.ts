import { IBaseRepositoryType } from "../../Architecture";
import { ProcessChainActionInjectionDBO } from "../../DBO";
import { ProcessChainActionInjection } from "../../Domain";


export interface IProcessChainActionInjectionRepository
  extends IBaseRepositoryType<ProcessChainActionInjectionDBO, ProcessChainActionInjection> {}

