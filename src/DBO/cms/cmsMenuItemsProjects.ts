'use strict';

import { BaseDBO } from "../../Architecture/Base/baseDBO";
import { TranslationsDBO } from "../translations";
import { CmsMenuItemsPrivilegesProjectsDBO } from "./cmsMenuItemsPrivilegesProjects";


/**
 * Interface for CmsMenuItemsProjects attributes
 */
export interface CmsMenuItemsProjectsDBO extends BaseDBO {
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

  menu_item_privileges?: CmsMenuItemsPrivilegesProjectsDBO[];
  translation?: TranslationsDBO;
}
