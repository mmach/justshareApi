import { IBaseRepositoryType } from "../../Architecture";
import { CmsMenuItemsPrivilegesProjectsDBO } from "../../DBO";
import { CmsMenuItemsPrivilegesProjects } from "../../Domain";

export interface ICmsMenuItemsPrivilegesProjectRepository
  extends IBaseRepositoryType<CmsMenuItemsPrivilegesProjectsDBO, CmsMenuItemsPrivilegesProjects> { }

  