import { IBaseServiceType } from "../../Architecture";
import { CmsMenuProjectsDBO } from "../../DBO";
import { CmsMenuProjects } from "../../Domain";

export interface ICmsMenuProjectService extends IBaseServiceType<CmsMenuProjectsDBO, CmsMenuProjects> {
  getCmsMenuAdmin(params: {}): Promise<CmsMenuProjectsDBO[] | null>;
  getCmsMenu(params: { init: boolean; token: string }): Promise<CmsMenuProjectsDBO[]>;
}
