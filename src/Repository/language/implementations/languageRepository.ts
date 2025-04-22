import { BaseRepositoryType } from "../../../Architecture";
import { LanguageDBO } from "../../../DBO";
import { Language } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";
import { ILanguageRepository } from "../languageRepository";


export default class LanguageRepository extends BaseRepositoryType<LanguageDBO, Language> implements ILanguageRepository {
  sequelizeDI: IMappsDbModels;

  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }) {
    super(sequelizeDI.Language);
    this.sequelizeDI = sequelizeDI;
  }

  async getLanguages({ transaction }: { transaction?: number }): Promise<Language[]> {
    return this.entityDAO.findAll({
      where: {},
      transaction: this.getTran({ transaction })
    });
  }
}

export const LanguageRepositoryPlugin = {
  pluginName: "language-repository",
  type: 'repository',
  di: 'languageRepositoryDI',
  classType: LanguageRepository
};