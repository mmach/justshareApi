import { IBaseRepositoryType } from "../../Architecture";
import { LanguageDBO } from "../../DBO";
import { Language } from "../../Domain";

export interface ILanguageRepository extends IBaseRepositoryType<LanguageDBO, Language> {
  getLanguages({ transaction }: { transaction?: number }): Promise<Language[]>;
}
