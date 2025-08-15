import { IBaseServiceType } from "../../Architecture";
import { CmsPagePrivilegesProjectsDBO } from "../../DBO";
import { CmsPagePrivilegesProjects } from "../../Domain";

export interface ICmsPagePrivilegesProjectService extends IBaseServiceType<CmsPagePrivilegesProjectsDBO, CmsPagePrivilegesProjects> {}
