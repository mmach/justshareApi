import { IBaseRepositoryType } from "../../Architecture";
import { CmsElementsProjectsDBO } from "../../DBO";
import { CmsElementsProject } from "../../Domain";


export interface ICmsElementsProjectRepository extends IBaseRepositoryType<CmsElementsProjectsDBO, CmsElementsProject> {
  getCmsElementsAdmin({ transaction }: { transaction?: number }): Promise<CmsElementsProject[]>;
  getCmsElements({ init, ids, is_active, transaction }: { init?: boolean; ids?: string[]; is_active?: boolean; transaction?: number }): Promise<CmsElementsProject[]>;
}
