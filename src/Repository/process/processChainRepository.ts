import { IBaseRepositoryType } from "../../Architecture";
import { ProcessChainDBO } from "../../DBO";
import { ProcessChain } from "../../Domain";


export interface IProcessChainRepository extends IBaseRepositoryType<ProcessChainDBO, ProcessChain> {}
