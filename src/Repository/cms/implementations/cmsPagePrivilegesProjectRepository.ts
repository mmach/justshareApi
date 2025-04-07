import { BaseRepositoryType } from "../../../Architecture";
import { CmsPagePrivilegesProjectsDBO } from "../../../DBO";
import { CmsPagePrivilegesProjects } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";
import { ICmsMenuItemsProjectsRepository } from "../cmsMenuItemsProjectRepository";

export default class CmsPagePrivilegesProjectRepository extends BaseRepositoryType<CmsPagePrivilegesProjectsDBO, CmsPagePrivilegesProjects> implements ICmsMenuItemsProjectsRepository {
  sequelizeDI: IMappsDbModels
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }) {
    super(sequelizeDI.CmsPagePrivilegesProjects);
    this.sequelizeDI = sequelizeDI;
  }

}
export const CmsPagePrivilegesProjectsRepositoryPlugin = {
  pluginName: "cms-page-privileges-projects-repository",
  type: 'repository',
  di: 'cmsPagePrivilegesProjectRepositoryDI',
  classType: CmsPagePrivilegesProjectRepository
};