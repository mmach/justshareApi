import { IBaseRepositoryType } from "../../Architecture";
import { LanguageProjectDBO } from "../../DBO";
import { LanguageProject } from "../../Domain";
import LanguageProjectRepository from "./implementations/languageProjectRepository";

export interface ILanguageProjectRepository extends IBaseRepositoryType<LanguageProjectDBO, LanguageProject> {
  getProjectLanguages({ transaction }: { transaction?: number }): Promise<LanguageProject[]>;
  setAsMainLang({ model, transaction }: { model: LanguageProjectDBO; transaction?: number }): Promise<void>;
}
