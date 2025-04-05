'use strict';

import { BaseDBO } from "../../Architecture/Base/baseDBO";
import { CategoryOptionAttributesDBO } from "./categoryOption";
import { V_CategoryDBO } from "./v_category";

/**
 * Interface for CategoryOptionsLink attributes
 */
export interface CategoryOptionsLinkDBO extends BaseDBO {
  id: string;
  co_id?: string;
  category_id?: string;
  is_require?: boolean;
  order?: number;
  is_searchable?: boolean;
  limit_of?: number;
  order_search?: number;
  is_on_pin_map?: boolean;
  is_on_map?: boolean;
  is_on_iua?: boolean;
  is_on_main_page?: boolean;
  is_on_iua_request?: boolean;
  is_params?: boolean;
  is_form_hidden?: boolean;
  search_label?: string;
  search_type?: string;
  show_value?: string;
  can_above_pin?: boolean;
  is_visible_view?: boolean;
  project_id?: string;
  is_form_rendered?: boolean;
  search_params?: string;
  preview_params?: string;
  create_params?: string;

  category?: V_CategoryDBO;
  catOption?: CategoryOptionAttributesDBO;
}
