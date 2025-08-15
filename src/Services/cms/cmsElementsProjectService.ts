import { IBaseServiceType } from "../../Architecture";
import { CmsElementsProjectsDBO } from "../../DBO";
import { CmsElementsProject } from "../../Domain";

export interface ICmsElementsProjectService
  extends IBaseServiceType<CmsElementsProjectsDBO, CmsElementsProject> {
  getCmsElementsAdmin(params: {}): Promise<CmsElementsProjectsDBO[]>;
  getCmsElements(params: {
    init: boolean;
    ids?: string[];
    is_active?: boolean;
  }): Promise<CmsElementsProjectsDBO[]>;
  getCmsElementsFlat(params: { init: boolean; ids: string[] }): Promise<
    {
      token: string;
      cms: string;
      load_on_init: boolean;
      id: string;
    }[]
  >;
}
