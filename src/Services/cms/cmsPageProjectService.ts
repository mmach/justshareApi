import { IBaseServiceType } from "../../Architecture";
import { CmsPagesProjectsDBO } from "../../DBO";
import { CmsPagesProjects } from "../../Domain";

export interface ICmsPageProjectService extends IBaseServiceType<CmsPagesProjectsDBO, CmsPagesProjects> {
  getCmsPage(params: {}): Promise<CmsPagesProjectsDBO[] | null>;
  getCmsPageAdmin(params: {}): Promise<CmsPagesProjectsDBO[] | null>;
}

