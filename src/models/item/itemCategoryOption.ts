'use strict';

import { CategoryOptionsLinkDTO, CategoryOptionsTemplateDTO } from "../category";

/**
 * Interface for ItemCategoryOption attributes
 */
export interface ItemCategoryOptionDTO {
  id: string;
  item_id?: string;
  col_id?: string;
  co_temp_id?: string;
  value?: string;
  status?: string;
  iua_id?: string;
  dim_id?: string;
  project_id?: string;

  category_link?: CategoryOptionsLinkDTO;
  cat_opt_temp?: CategoryOptionsTemplateDTO;
}
