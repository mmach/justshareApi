import { BaseServiceType } from "../../../Architecture";
import { CmsMenuProjectsDBO } from "../../../DBO";
import { DI } from "../../../diTypes";
import { CmsMenuProjects } from "../../../Domain";
import { ICmsMenuProjectService } from "../cmsMenuProjectService";

class CmsMenuProjectService extends BaseServiceType<CmsMenuProjectsDBO, CmsMenuProjects> implements ICmsMenuProjectService {
  constructor({ unitOfWorkDI }: DI) {
    super({ unitOfWorkDI, repository: 'cmsMenuProjectsRepository' });
  }

  async getCmsMenuAdmin({ }): Promise<CmsMenuProjectsDBO[] | null> {
    let result = await this.toJsonParse<CmsMenuProjectsDBO[]>(this.unitOfWorkDI.cmsMenuProjectsRepository.getCmsMenuAdmin({}))
    return result;
  }
  async getCmsMenu({  token }: { init: boolean, token: string }): Promise<CmsMenuProjectsDBO[]> {
    let result = await this.toJsonParse<CmsMenuProjectsDBO[]>(this.unitOfWorkDI.cmsMenuProjectsRepository.getCmsMenu({  token }))
    return result!;
  }
}

export const CmsMenuProjectServicePlugin = {
  pluginName: "cms-menu-project-service",
  type: 'service',
  di: 'cmsMenuProjectServiceDI',
  classType: CmsMenuProjectService
} 
