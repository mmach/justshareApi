import { BaseServiceType } from "../../../Architecture";
import { CmsPagesProjectsDBO } from "../../../DBO";
import { DI } from "../../../diTypes";
import { CmsPagesProjects } from "../../../Domain";
import { ICmsPageProjectService } from "../cmsPageProjectService";



class CmsPageProjectService extends BaseServiceType<CmsPagesProjectsDBO, CmsPagesProjects> implements ICmsPageProjectService  {
  constructor({ unitOfWorkDI }: DI) {
    super({ unitOfWorkDI, repository: 'cmsPageProjectsRepository' });
  }


  async getCmsPage({ }): Promise<CmsPagesProjectsDBO[] | null> {
    let result = await this.toJsonParse<CmsPagesProjectsDBO[]>(this.unitOfWorkDI.cmsPageProjectsRepository.getCmsPages({}))
    return result;
  }

  async getCmsPageAdmin({ }): Promise<CmsPagesProjectsDBO[] | null> {
    let result = await this.toJsonParse<CmsPagesProjectsDBO[]>(this.unitOfWorkDI.cmsPageProjectsRepository.getCmsPagesAdmin({}))
    return result;
  }
}

export const CmsPageProjectServicePlugin = {
    pluginName: "cms-page-project-service",
    type: 'service',
    di: 'cmsPageProjectServiceDI',
    classType: CmsPageProjectService
} 
