import { BaseDBO } from "../../Architecture/Base/baseDBO";


/**
 * Interface for CmsElementsProjects attributes
 */
export interface CmsElementsProjectsDBO extends BaseDBO {
  id: string;
  cms?: string;
  load_on_init?: boolean;
  token?: string;
  project_id?: string;
  cms_element_id?: string;
  is_active?: boolean;

  cms_element?: CmsElementsProjectsDBO;

}
