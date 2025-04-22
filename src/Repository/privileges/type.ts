import { IPrivilegeRepository } from "./privilegeRepository.js";
import { IPrivilegeProjectRepository } from "./privilegeProjectRepository.js";

export type PRIVILEGES_REPOSITORY = {
  privilegeRepositoryDI: IPrivilegeRepository;
  privilegeProjectRepositoryDI: IPrivilegeProjectRepository;
};