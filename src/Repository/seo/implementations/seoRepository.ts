import { BaseRepositoryType } from "../../../Architecture";
import { SeosDBO } from "../../../DBO";
import { Seos } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";
import { ISeoRepository } from "../seoRepository";


export default class SeoRepository extends BaseRepositoryType<SeosDBO,Seos>  implements ISeoRepository {
  sequelizeDI: IMappsDbModels
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }) {
    super(sequelizeDI.Seos);
    this.sequelizeDI = sequelizeDI;
  }
}


export const SeoRepositoryPlugin = {
  pluginName: "seo-repository",
  type: 'repository',
  di: 'seoRepositoryDI',
  classType: SeoRepository
};