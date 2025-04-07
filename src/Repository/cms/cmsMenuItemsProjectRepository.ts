import { IBaseRepositoryType } from "../../Architecture";
import { CmsMenuItemsProjectsDBO } from "../../DBO";
import { CmsMenuItemsPrivilegesProjects } from "../../Domain";


export interface ICmsMenuItemsProjectsRepository
  extends IBaseRepositoryType<CmsMenuItemsProjectsDBO, CmsMenuItemsPrivilegesProjects> { }
