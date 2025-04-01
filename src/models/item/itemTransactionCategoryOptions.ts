'use strict';

import { CategoryOptionsLinkDTO, CategoryOptionsTemplateDTO } from "../category";

/**
 * Interface for ItemTransactionCategoryOptions attributes
 */
export interface ItemTransactionCategoryOptionsDTO {
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

  category_link?: CategoryOptionsLinkDTO;
  cat_opt_temp?: CategoryOptionsTemplateDTO;
}
