
import { CategoryDTO } from "../category/category";
import { ProjectDTO } from "../project/project";
import { TagDTO } from "../tag/tag";
import { vUserDTO } from "../user/v_user";
import { ItemDTO } from "./item";
import { ItemTransactionCategoryOptionsDTO } from "./itemTransactionCategoryOptions";
import { ItemUserActionDTO } from "./itemUserAction";

/**
 * Interface for ItemTransaction attributes
 */
export interface ItemTransactionDTO {
  id: string;
  name?: string;
  description?: string;
  user_id?: string;
  blob_id?: string;
  category_id?: string;
  iua_id?: string;
  parent_iua_id?: string;
  item_id?: string;
  longitude?: number;
  latitude?: number;
  category_type?: number;
  expired_date?: Date;
  status?: number;
  project_id?: string;
  external_id?: string;
  category?: CategoryDTO;
  project?: ProjectDTO;
  iua_main?: ItemUserActionDTO;
  item?: ItemDTO;
  user?: vUserDTO;
  itemCategoryOption?: ItemTransactionCategoryOptionsDTO[];
  tags?: TagDTO[];
}
