import { IBaseRepositoryType } from "../../Architecture";
import { CmsPagePrivilegesProjectsDBO } from "../../DBO";
import { CmsPagePrivilegesProjects } from "../../Domain";

export interface ICmsPagePrivilegesProjectsRepository
  extends IBaseRepositoryType<CmsPagePrivilegesProjectsDBO, CmsPagePrivilegesProjects> {}
