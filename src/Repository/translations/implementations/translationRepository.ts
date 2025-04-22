import { BaseRepositoryType } from "../../../Architecture";
import { TranslationsDBO } from "../../../DBO";
import { Translations } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";
import { ITranslationRepository } from "../translationRepository";

export default class TranslationRepository extends BaseRepositoryType<TranslationsDBO, Translations> implements ITranslationRepository {
  sequelizeDI: IMappsDbModels
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }) {

    super(sequelizeDI.Translations);
    this.sequelizeDI = sequelizeDI;
  }
  getTokens({ code, token, transaction }: { code?: string, token?: string, transaction?: number }): Promise<Translations[]> {
    let where: Partial<TranslationsDBO> = {
      project_id: this.context.project.id,
    }
    if (code) {
      where.type = code
    }
    if (token) {
      where.token = token
    }
    return this.entityDAO.findAll({
      where: where,
      transaction: this.getTran({ transaction })
    });
  }
}


export const TranslationRepositoryPlugin = {
  pluginName: "translation-repository",
  type: 'repository',
  di: 'translationRepositoryDI',
  classType: TranslationRepository
};
