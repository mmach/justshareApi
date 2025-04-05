import { BaseDBO } from "../../Architecture/Base/baseDBO";
import { CategoryOptionsTypeTemplateDBO } from "./categoryOptionsTypeTemplate";

/**
 * Interface for CategoryOptionsType attributes
 */
export interface CategoryOptionsTypeDBO extends BaseDBO {
  id: string;
  name?: string;
  type?: string;
  status?: boolean;
  is_strict?: boolean;

  cat_options_type_temp?: CategoryOptionsTypeTemplateDBO[];
}
