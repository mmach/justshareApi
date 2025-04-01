'use strict';

import { BlobDTO } from "../blob";
import { TranslationsDTO } from "../translations";
import { CategoryActionsDTO } from "./categoryActions";

/**
 * Interface for V_Category attributes
 */
export interface V_CategoryDTO {
  id: string;
  category?: string;
  category_pl?: string;
  category_us?: string;
  category_de?: string;
  category_ru?: string;
  category_fr?: string;
  category_es?: string;
  category_no?: string;
  category_zh_cn?: string;
  status?: number;
  forThing?: number;
  forSell?: number;
  forEvent?: number;
  expired_day?: number;
  project_id?: string;
  blob_id?: string;
  color?: string;
  translation_id?: string;
  process_id?: string;
  cms_preview?: string;
  cms_create?: string;
  cms_edit?: string;
  cms_search?: string;

  icon_blob?: BlobDTO;
  translation?: TranslationsDTO;
  actions?: CategoryActionsDTO[];
  category_children?: V_CategoryDTO[];
  category_parent?: V_CategoryDTO[];
}
