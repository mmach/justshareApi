'use strict';

import { TranslationsDTO } from "../translations";
import { CmsMenuItemsPrivilegesProjectsDTO } from "./cmsMenuItemsPrivilegesProjects";


/**
 * Interface for CmsMenuItemsProjects attributes
 */
export interface CmsMenuItemsProjectsDTO {
  id: string;
  cms_menu_item_parent_id?: string;
  cms_menu_id?: string;
  translation_id?: string;
  url?: string;
  icon?: string;
  is_expanded?: boolean;
  func?: string;
  plugin_name?: string;
  project_id?: string;
  is_active?: boolean;
  sort_order?: number;

  menu_item_privileges?: CmsMenuItemsPrivilegesProjectsDTO[];
  translation?: TranslationsDTO;
}
