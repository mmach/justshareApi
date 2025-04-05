import { BaseDBO } from "../../Architecture/Base/baseDBO";


/**
 * Interface for ItemCategory attributes
 */
export interface ItemCategoryDBO extends BaseDBO{
  id: string;
  item_id?: string;
  category_id?: string;
  is_visible?: number;
}
