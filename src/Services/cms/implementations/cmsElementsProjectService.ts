import { BaseServiceType } from "../../../Architecture";
import { CmsElementsProjectsDBO } from "../../../DBO";
import { DI } from "../../../diTypes";
import { CmsElementsProject } from "../../../Domain";
import { ICmsElementsProjectService } from "../cmsElementsProjectService";


class CmsElementsProjectService extends BaseServiceType<CmsElementsProjectsDBO, CmsElementsProject> implements ICmsElementsProjectService {
  constructor({ unitOfWorkDI }: DI) {
    super({ unitOfWorkDI, repository: 'cmsElementsProjectRepository' });
  }

  async getCmsElementsAdmin({ }): Promise<CmsElementsProjectsDBO[]> {
    let result = await this.toJsonParse<CmsElementsProjectsDBO[]>(this.unitOfWorkDI.cmsElementsProjectRepository.getCmsElementsAdmin({}))
    return result!;
  }

  async getCmsElements({ init, ids, is_active }: { init: boolean, ids?: string[], is_active?: boolean }): Promise<CmsElementsProjectsDBO[]> {
    let result = await this.toJsonParse<CmsElementsProjectsDBO[]>(this.unitOfWorkDI.cmsElementsProjectRepository.getCmsElements({ init, ids, is_active }))
    return result!;
  }

  async getCmsElementsFlat({ init, ids }: { init: boolean, ids: string[] }): Promise<{ token: string, cms: string, load_on_init: boolean, id: string }[]> {
    let result = await this.getCmsElements({ init, ids, is_active: true })
    result = result.map(item => {
      return {
        token: item.token || (item.cms_element && item.cms_element.token),
        cms: item.cms || (item.cms_element && item.cms_element.cms),
        load_on_init: item.cms_element && item.cms_element.load_on_init,
        id: item.id
      }
    });
    return result;
  }
}

export const CmsElementsProjectServicePlugin = {
  pluginName: "cms-element-project-service",
  type: 'service',
  di: 'cmsElementsProjectServiceDI',
  classType: CmsElementsProjectService
} 
