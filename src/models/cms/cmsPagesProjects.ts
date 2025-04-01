import { TranslationsDTO } from "../translations";
import { CmsPagePrivilegesProjectsDTO } from "./cmsPagePrivilegesProjects";


/**
 * Interface for CmsPagesProjects attributes
 */
export interface CmsPagesProjectsDTO {
  id: string;
  title?: string;
  translation_id?: string;
  url?: boolean;
  project_id?: string;
  is_active?: boolean;
  url_exact?: boolean;
  cms?: string;
  layout_plugin_name?: string;
  is_homepage?: boolean;
  route_group?: string;
  func?: string;

  translation?: TranslationsDTO;
  page_privileges?: CmsPagePrivilegesProjectsDTO[];
}
