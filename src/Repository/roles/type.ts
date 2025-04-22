import { IRolesRepository } from "./rolesRepository.js";
import { IRolesProjectRepository } from "./rolesProjectRepository.js";

export type ROLES_REPOSITORY = {
  rolesRepositoryDI: IRolesRepository;
  rolesProjectRepositoryDI: IRolesProjectRepository;
};