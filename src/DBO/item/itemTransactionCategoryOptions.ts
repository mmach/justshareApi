'use strict';

import { BaseDBO } from "../../Architecture/Base/baseDBO";
import { CategoryOptionsLinkDBO, CategoryOptionsTemplateDBO } from "../category";

/**
 * Interface for ItemTransactionCategoryOptions attributes
 */
export interface ItemTransactionCategoryOptionsDBO extends BaseDBO{
  id: string;
  item_id?: string;
  ico_id?: string;
  itemTransaction_id?: string;
  col_id?: string;
  co_temp_id?: string;
  value?: string;
  status?: string;
  iua_id?: string;
  dim_id?: string;

  category_link?: CategoryOptionsLinkDBO;
  cat_opt_temp?: CategoryOptionsTemplateDBO;
}
