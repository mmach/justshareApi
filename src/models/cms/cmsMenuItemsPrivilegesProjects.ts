import { PrivilegesProjectDTO } from "../privileges";


/**
 * Interface for CmsMenuItemsPrivilegesProjects attributes
 */
export interface CmsMenuItemsPrivilegesProjectsDTO {
  id: string;
  privilege_id?: string;
  cms_menu_item_id?: string;
  status?: string;
  project_id?: string;

  privileges?: PrivilegesProjectDTO;
}
