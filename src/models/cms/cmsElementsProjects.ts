

/**
 * Interface for CmsElementsProjects attributes
 */
export interface CmsElementsProjectsDTO {
  id: string;
  cms?: string;
  load_on_init?: boolean;
  token?: string;
  project_id?: string;
  cms_element_id?: string;
  is_active?: boolean;

  cms_element?: CmsElementsProjectsDTO;

}
