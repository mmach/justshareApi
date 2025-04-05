
import { BaseDBO } from "../../Architecture/Base/baseDBO";
import { CategoryDBO } from "../category";
import { ProjectDBO } from "../project";
import { TagDBO } from "../tag";
import { vUserDBO } from "../user";
import { ItemDBO } from "./item";
import { ItemTransactionCategoryOptionsDBO } from "./itemTransactionCategoryOptions";
import { ItemUserActionDBO } from "./itemUserAction";

/**
 * Interface for ItemTransaction attributes
 */
export interface ItemTransactionDBO extends BaseDBO{
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
  category?: CategoryDBO;
  project?: ProjectDBO;
  iua_main?: ItemUserActionDBO;
  item?: ItemDBO;
  user?: vUserDBO;
  itemCategoryOption?: ItemTransactionCategoryOptionsDBO[];
  tags?: TagDBO[];
}
