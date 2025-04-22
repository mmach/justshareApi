import { IBaseRepositoryType } from "../../Architecture";
import { SeosDBO } from "../../DBO";
import { Seos } from "../../Domain";

export interface ISeoRepository extends IBaseRepositoryType<SeosDBO,Seos> {}
