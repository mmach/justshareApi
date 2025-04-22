import { IMailPartsRepository } from "./mailPartsRepository.js";
import { IMailSendersRepository } from "./mailSendersRepository.js";
import { IMailTypesRepository } from "./mailTypesRepository.js";
import { IMailTypesProjectRepository } from "./mailTypesProjectRepository.js";

export type MAIL_REPOSITORY = {
  mailPartsRepositoryDI: IMailPartsRepository;
  mailSendersRepositoryDI: IMailSendersRepository;
  mailTypesRepositoryDI: IMailTypesRepository;
  mailTypesProjectRepositoryDI: IMailTypesProjectRepository;
};