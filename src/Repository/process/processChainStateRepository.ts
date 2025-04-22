import { IBaseRepositoryType } from "../../Architecture";
import { ProcessChainStateDBO } from "../../DBO";
import { ProcessChainState } from "../../Domain";

export interface IProcessChainStateRepository extends IBaseRepositoryType<ProcessChainStateDBO, ProcessChainState> {}
