import { BaseRepositoryType } from "../../../Architecture";
import { CmsMenuItemsProjectsDBO } from "../../../DBO";
import { CmsMenuItemsPrivilegesProjects } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";
import { ICmsMenuItemsProjectsRepository } from "../cmsMenuItemsProjectRepository";


export default class CmsMenuItemsProjectsRepository extends BaseRepositoryType<CmsMenuItemsProjectsDBO, CmsMenuItemsPrivilegesProjects> implements ICmsMenuItemsProjectsRepository {
  sequelizeDI: IMappsDbModels
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }) {
    super(sequelizeDI.CmsMenuItemsProjects);
    this.sequelizeDI = sequelizeDI;
  }

}

export const CmsMenuItemsProjectsRepositoryPlugin = {
  pluginName: "cms-menu-items-projects-repository",
  type: 'repository',
  di: 'cmsMenuItemsProjectRepositoryDI',
  classType: CmsMenuItemsProjectsRepository
};