import { IBaseRepositoryType } from "../../Architecture";
import { TranslationsDBO } from "../../DBO";
import { Translations } from "../../Domain";


export interface ITranslationRepository extends IBaseRepositoryType<TranslationsDBO, Translations> {
  getTokens({ code, token, transaction }: { code?: string; token?: string; transaction?: number }): Promise<Translations[]>;
}
