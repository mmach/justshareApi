import { CategoryOptionsTypeTemplateDTO } from "./categoryOptionsTypeTemplate";

/**
 * Interface for CategoryOptionsType attributes
 */
export interface CategoryOptionsTypeDTO {
  id: string;
  name?: string;
  type?: string;
  status?: boolean;
  is_strict?: boolean;

  cat_options_type_temp?: CategoryOptionsTypeTemplateDTO[];
}
