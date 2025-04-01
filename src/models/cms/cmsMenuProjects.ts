import { CmsMenuItemsProjectsDTO } from "./cmsMenuItemsProjects";


/**
 * Interface for CmsMenuProjects attributes
 */
export interface CmsMenuProjectsDTO {
  id: string;
  token?: string;
  load_on_init?: boolean;
  project_id?: string;
  is_active?: boolean;

  menu_items?: CmsMenuItemsProjectsDTO[];
}
