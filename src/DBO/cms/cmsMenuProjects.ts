import { BaseDBO } from "../../Architecture/Base/baseDBO";
import { CmsMenuItemsProjectsDBO } from "./cmsMenuItemsProjects";


/**
 * Interface for CmsMenuProjects attributes
 */
export interface CmsMenuProjectsDBO extends BaseDBO{
  id: string;
  token?: string;
  load_on_init?: boolean;
  project_id?: string;
  is_active?: boolean;

  menu_items?: CmsMenuItemsProjectsDBO[];
}
