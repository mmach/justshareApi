import { BaseRepositoryType, IBaseRepositoryType } from "../../../Architecture";
import { BlobMapperDBO } from "../../../DBO";
import { BlobMapper } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";

export default class BlobMapperRepository extends BaseRepositoryType<BlobMapperDBO, BlobMapper> implements IBlobMapperRepository {
  sequelizeDI: IMappsDbModels;

  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }) {
    super(sequelizeDI.BlobMapper);
    this.sequelizeDI = sequelizeDI;
  }
}

export interface IBlobMapperRepository extends IBaseRepositoryType<BlobMapperDBO, BlobMapper> { }

export const BlobMapperRepositoryPlugin = {
  pluginName: "blob-mapper-repository",
  type: 'repository',
  di: 'blobMapperRepositoryDI',
  classType: BlobMapperRepository
};