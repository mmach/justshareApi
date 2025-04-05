import { BaseDBO } from "../../Architecture/Base/baseDBO";
import { PrivilegesProjectDBO } from "../privileges";


/**
 * Interface for CmsMenuItemsPrivilegesProjects attributes
 */
export interface CmsMenuItemsPrivilegesProjectsDBO extends BaseDBO {
  id: string;
  privilege_id?: string;
  cms_menu_item_id?: string;
  status?: string;
  project_id?: string;

  privileges?: PrivilegesProjectDBO;
}
