import { BaseServiceType } from "../../../Architecture";
import { CmsPagePrivilegesProjectsDBO } from "../../../DBO";
import { DI } from "../../../diTypes";
import { CmsPagePrivilegesProjects } from "../../../Domain";
import { ICmsPagePrivilegesProjectService } from "../cmsPagePrivilegesProjectService";

class CmsPagePrivilegesProjectService extends BaseServiceType<CmsPagePrivilegesProjectsDBO, CmsPagePrivilegesProjects> implements ICmsPagePrivilegesProjectService {
  constructor({ unitOfWorkDI }: DI) {
    super({ unitOfWorkDI, repository: 'cmsPagePrivilegesProjectRepository' });
  }

}

export const CmsPagePrivilegesProjectServicePlugin = {
  pluginName: "cms-page-privileges-project-service",
  type: 'service',
  di: 'cmsPagePrivilegesProjectServiceDI',
  classType: CmsPagePrivilegesProjectService
} 
