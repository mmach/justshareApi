import { BaseServiceType } from "../../../Architecture";
import { CmsMenuItemsPrivilegesProjectsDBO } from "../../../DBO";
import { DI } from "../../../diTypes";
import { CmsMenuItemsPrivilegesProjects } from "../../../Domain";
import { ICmsMenuItemsPrivilegesProjectRepository } from "../cmsMenuItemsPrivilegesProjectService";

class CmsMenuItemsPrivilegesProjectService extends BaseServiceType<CmsMenuItemsPrivilegesProjectsDBO, CmsMenuItemsPrivilegesProjects> implements ICmsMenuItemsPrivilegesProjectRepository {
  constructor({ unitOfWorkDI }: DI) {
    super({ unitOfWorkDI, repository: 'cmsMenuItemsPrivilegesProjectRepository' });
  }

}
export const CmsMenuItemsPrivilegesProjectServicePlugin = {
  pluginName: "cms-menu-items-privileges-project-service",
  type: 'service',
  di: 'cmsMenuItemsPrivilegesProjectServiceDI',
  classType: CmsMenuItemsPrivilegesProjectService
} 
