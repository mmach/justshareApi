import { PrivilegesProjectDTO } from "../privileges";

/**
 * Interface for CmsPagePrivilegesProjects attributes
 */
export interface CmsPagePrivilegesProjectsDTO {
  id: string;
  privilege_id?: string;
  cms_page_id?: string;
  status?: string;
  project_id?: string;


  privileges?: PrivilegesProjectDTO;
}
