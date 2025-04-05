'use strict';

import { BaseDBO } from "../../Architecture/Base/baseDBO";
import { BlobDBO } from "../blob";
import { TranslationsDBO } from "../translations";
import { CategoryActionsDBO } from "./categoryActions";


/**
 * Interface for Category attributes
 */
export interface CategoryDBO extends BaseDBO {
  id: string;
  status?: number;
  forThing?: number;
  forSell?: number;
  forEvent?: number;
  view_type?: string;
  expired_day?: number;
  project_id?: string;
  blob_id?: string;
  color?: string;
  translation_id?: string;
  process_id?: string;
  is_root?: boolean;
  cms_preview?: string;
  cms_create?: string;
  cms_edit?: string;
  cms_search?: string;

  category_children?: CategoryDBO[];
  icon_blob?: BlobDBO;
  actions?: CategoryActionsDBO[];
  category_parent?: CategoryDBO[];
  translation?: TranslationsDBO;
}

