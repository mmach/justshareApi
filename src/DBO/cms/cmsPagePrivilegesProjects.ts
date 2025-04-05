import { BaseDBO } from "../../Architecture/Base/baseDBO";
import { PrivilegesProjectDBO } from "../privileges";

/**
 * Interface for CmsPagePrivilegesProjects attributes
 */
export interface CmsPagePrivilegesProjectsDBO extends BaseDBO {
  id: string;
  privilege_id?: string;
  cms_page_id?: string;
  status?: string;
  project_id?: string;


  privileges?: PrivilegesProjectDBO;
}
