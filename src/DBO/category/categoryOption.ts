import { BaseDBO } from "../../Architecture/Base/baseDBO";
import { TranslationsDBO } from "../translations";
import { CategoryOptionsLinkDBO } from "./categoryOptionsLink";
import { CategoryOptionsTemplateDBO } from "./categoryOptionsTemplate";
import { CategoryOptionsTypeDBO } from "./categoryOptionsType";

/**
 * Interface for CategoryOption attributes
 */
export interface CategoryOptionAttributesDBO extends BaseDBO {
  id: string;
  cot_id?: string;
  name?: string;
  name_pl?: string;
  name_us?: string;
  name_de?: string;
  name_ru?: string;
  name_fr?: string;
  name_es?: string;
  name_no?: string;
  name_zh_cn?: string;
  status?: boolean;
  order?: number;
  is_searchable?: boolean;
  is_require?: boolean;
  limit_of?: number;
  is_on_pin_map?: boolean;
  is_on_iua?: boolean;
  is_on_iua_request?: boolean;
  is_params?: boolean;
  is_on_map?: boolean;
  is_on_main_page?: boolean;
  is_form_hidden?: boolean;
  search_label?: string;
  search_type?: string;
  show_value?: string;
  can_above_pin?: boolean;
  is_visible_view?: boolean;
  project_id?: string;
  dim_id?: string;
  order_search?: number;
  is_required?: number;
  is_required_message?: string;
  min_selected?: number;
  min_selected_dim_id_ref?: string;
  min_selected_message?: string;
  max_selected?: number;
  max_selected_dim_id_ref?: string;
  max_selected_message?: string;
  is_form_rendered?: boolean;
  search_params?: string;
  preview_params?: string;
  create_params?: string;
  translation_id?: string;

  cat_opt?: CategoryOptionsTypeDBO;
  cat_opt_temp?: CategoryOptionsTemplateDBO[];
  category_link?: CategoryOptionsLinkDBO[];
  translation?: TranslationsDBO;
}
