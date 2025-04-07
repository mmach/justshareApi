import { IBaseRepositoryType } from "../../Architecture";
import { CmsMenuProjectsDBO } from "../../DBO";
import { CmsMenuProjects } from "../../Domain";

export interface ICmsMenuProjectsRepository
  extends IBaseRepositoryType<CmsMenuProjectsDBO, CmsMenuProjects> {
  getCmsMenuAdmin({ transaction }: { transaction?: number }): Promise<CmsMenuProjects[]>;
  getCmsMenu({ token, transaction }: { token?: string; transaction?: number }): Promise<CmsMenuProjects[]>;
}
