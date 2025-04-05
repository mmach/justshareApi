'use strict';

import { BaseDBO } from "../../Architecture/Base/baseDBO";
import { BlobDBO } from "../blob";
import { TranslationsDBO } from "../translations";
import { CategoryActionsDBO } from "./categoryActions";

/**
 * Interface for V_Category attributes
 */
export interface V_CategoryDBO extends BaseDBO {
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

  icon_blob?: BlobDBO;
  translation?: TranslationsDBO;
  actions?: CategoryActionsDBO[];
  category_children?: V_CategoryDBO[];
  category_parent?: V_CategoryDBO[];
}
