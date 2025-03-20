import { Model } from "sequelize";

export interface CategoryOptionsTemplateDTO {
  id: string;
  co_id?: string;
  cott_id?: string;
  value?: string;
  value_pl?: string;
  value_us?: string;
  value_de?: string;
  value_ru?: string;
  value_fr?: string;
  value_es?: string;
  value_no?: string;
  value_zh_cn?: string;
  placeholder?: string;
  placeholder_pl?: string;
  placeholder_us?: string;
  placeholder_de?: string;
  placeholder_ru?: string;
  placeholder_fr?: string;
  placeholder_es?: string;
  placeholder_no?: string;
  placeholder_zh_cn?: string;
  token?: string;
  status?: boolean;
  order?: number;
  is_not_in_clob?: boolean;
  func?: string;
  is_visible_view?: boolean;
  is_visible_form?: boolean;
  is_visible_search?: boolean;
  dim_ref_id?: string;
  dim_id?: string;
  is_readOnly?: boolean;
  is_from_url?: boolean;
  is_default_value?: boolean;
  default_value?: string;
  input_format?: string;
  is_required?: boolean;
  is_required_message?: string;
  min?: number;
  min_dim_id_ref?: string;
  min_message?: string;
  max?: number;
  max_dim_id_ref?: string;
  max_message?: string;
  max_length?: number;
  max_length_message?: string;
  min_length?: number;
  min_length_message?: string;
  pattern?: string;
  pattern_message?: string;
  thousand_separator?: boolean;
  mask?: string;
  allow_negative?: boolean;
  allow_empty_formatting?: boolean;
  allow_leading_zeros?: boolean;
  decimal_separator?: string;
  decimal_scale?: number;
  is_prefix?: boolean;
  is_suffix?: boolean;
  value_translation_id?: string;
}

