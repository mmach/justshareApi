import { IBaseRepositoryType } from "../../Architecture";
import { BlobMapperDBO } from "../../DBO";
import { BlobMapper } from "../../Domain";


export interface IBlobMapperRepository extends IBaseRepositoryType<BlobMapperDBO, BlobMapper> { }

