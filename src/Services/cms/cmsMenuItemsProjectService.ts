import { IBaseServiceType } from "../../Architecture";
import { CmsMenuItemsProjectsDBO } from "../../DBO";
import { CmsMenuItemsProjects } from "../../Domain";

export interface ICmsMenuItemsProjectService extends IBaseServiceType<CmsMenuItemsProjectsDBO, CmsMenuItemsProjects> {}

