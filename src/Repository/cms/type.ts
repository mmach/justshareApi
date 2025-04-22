import { ICmsMenuItemsPrivilegesProjectRepository } from "./cmsMenuItemsPrivilegesProjectRepository.js";
import { ICmsMenuItemsProjectsRepository } from "./cmsMenuItemsProjectRepository.js";
import { ICmsMenuProjectsRepository } from "./cmsMenuProjectRepository.js";
import { ICmsPagePrivilegesProjectsRepository } from "./cmsPagePrivilegesProjectRepository.js";
import { ICmsPageProjectsRepository } from "./cmsPageProjectsRepository.js";
import { ICmsElementsProjectRepository } from "./cmsElementsProjectRepository.js";

export type CMS_REPOSITORY = {
  cmsMenuItemsPrivilegesProjectRepositoryDI: ICmsMenuItemsPrivilegesProjectRepository;
  cmsMenuItemsProjectRepositoryDI: ICmsMenuItemsProjectsRepository;
  cmsMenuProjectsRepositoryDI: ICmsMenuProjectsRepository;
  cmsPagePrivilegesProjectRepositoryDI: ICmsPagePrivilegesProjectsRepository;
  cmsPageProjectsRepositoryDI: ICmsPageProjectsRepository;
  cmsElementsProjectRepositoryDI: ICmsElementsProjectRepository;
};