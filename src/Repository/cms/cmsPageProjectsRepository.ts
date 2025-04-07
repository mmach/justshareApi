import { IBaseRepositoryType } from "../../Architecture";
import { CmsPagesProjectsDBO } from "../../DBO";
import { CmsPagesProjects } from "../../Domain";

export interface ICmsPageProjectsRepository
  extends IBaseRepositoryType<CmsPagesProjectsDBO, CmsPagesProjects> {
  getCmsPagesAdmin({ transaction }: { transaction?: number }): Promise<CmsPagesProjects[]>;
  getCmsPages({ transaction }: { transaction?: number }): Promise<CmsPagesProjects[]>;
}
