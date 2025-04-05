import { BaseDBO } from "../../Architecture/Base/baseDBO";


/**
 * Interface for CategoryOptionsTypeTemplate attributes
 */
export interface CategoryOptionsTypeTemplateDBO extends BaseDBO {
  id: string;
  cot_id?: string;
  type?: string;
  status?: boolean;
  order?: number;
  is_func?: boolean;
}
