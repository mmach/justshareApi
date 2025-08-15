import { BaseServiceType } from "../../../Architecture";
import { CmsMenuItemsProjectsDBO } from "../../../DBO";
import { DI } from "../../../diTypes";
import { CmsMenuItemsProjects } from "../../../Domain";
import { ICmsMenuItemsProjectService } from "../cmsMenuItemsProjectService";

 class CmsMenuItemsProjectService extends BaseServiceType<CmsMenuItemsProjectsDBO, CmsMenuItemsProjects> implements ICmsMenuItemsProjectService {
   constructor({ unitOfWorkDI }: DI) {
    super({ unitOfWorkDI, repository: 'cmsMenuItemsProjectRepository' });
  }

}

export const CmsMenuItemsProjectServicePlugin = {
    pluginName: "cms-menu-items-project-service",
    type: 'service',
    di: 'cmsMenuItemsProjectServiceDI',
    classType: CmsMenuItemsProjectService
} 
