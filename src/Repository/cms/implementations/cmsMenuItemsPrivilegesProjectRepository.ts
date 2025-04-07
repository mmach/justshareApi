import { BaseRepositoryType } from "../../../Architecture";
import { CmsMenuItemsPrivilegesProjectsDBO } from "../../../DBO";
import { CmsMenuItemsPrivilegesProjects } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";
import { ICmsMenuItemsPrivilegesProjectRepository } from "../cmsMenuItemsPrivilegesProjectRepository";

export default class CmsMenuItemsPrivilegesProjectRepository extends BaseRepositoryType<CmsMenuItemsPrivilegesProjectsDBO, CmsMenuItemsPrivilegesProjects> implements ICmsMenuItemsPrivilegesProjectRepository {
  sequelizeDI: IMappsDbModels
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }) {
    super(sequelizeDI.CmsMenuItemsPrivilegesProjects);
    this.sequelizeDI = sequelizeDI;
  }
}

  
export const CmsMenuItemsPrivilegesProjectRepositoryPlugin = {
  pluginName: "cms-menu-items-privileges-project-repository",
  type: 'repository',
  di: 'cmsMenuItemsPrivilegesProjectRepositoryDI',
  classType: CmsMenuItemsPrivilegesProjectRepository
};