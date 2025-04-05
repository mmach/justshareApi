import { BaseDBO } from "../../Architecture/Base/baseDBO";


/**
 * Interface for ItemTag attributes
 */
export interface ItemTagDBO extends BaseDBO{
  id: string;
  tag_id?: string;
  item_id?: string;
}
