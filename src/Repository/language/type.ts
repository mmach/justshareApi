import { ILanguageRepository } from "./languageRepository.js";
import { ILanguageProjectRepository } from "./languageProjectRepository.js";

export type LANGUAGE_REPOSITORY = {
  languageRepositoryDI: ILanguageRepository;
  languageProjectRepositoryDI: ILanguageProjectRepository;
};