import { IUserRepository } from "./userRepository.js";
import { IUserAuthRepository } from "./userAuthRepository.js";
import { IUserRolesRepository } from "./userRolesRepository.js";
import { IUserConversationsRepository } from "./userConversationsRepository.js";
import { IUserInvoiceValuesRepository } from "./userInvoiceValuesRepository.js";
import { IUserTypesRepository } from "./userTypesRepository.js";
import { IUserTypesRolesRepository } from "./userTypesRolesRepository.js";

export type USER_REPOSITORY = {
  userRepositoryDI: IUserRepository;
  userAuthRepositoryDI: IUserAuthRepository;
  userRolesRepositoryDI: IUserRolesRepository;
  userConversationsRepositoryDI: IUserConversationsRepository;
  userInvoiceValuesRepositoryDI: IUserInvoiceValuesRepository;
  userTypesRepositoryDI: IUserTypesRepository;
  userTypesRolesRepositoryDI: IUserTypesRolesRepository;
};