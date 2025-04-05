import { BaseDBO } from "../../Architecture/Base/baseDBO";


/**
 * Interface for ItemCategoryOptionTerm attributes
 */
export interface ItemCategoryOptionTermDBO extends BaseDBO{
  id: string;
  item_id?: string;
  col_id?: string;
  co_temp_id?: string;
  start_date?: Date;
  project_id?: string;
  end_date?: Date;
  iua_id?: string;
  dim_id?: string;
  co_id?: string;
}
