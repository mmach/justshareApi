'use strict';

import { BlobDTO } from "../blob";
import { TranslationsDTO } from "../translations";
import { CategoryActionsDTO } from "./categoryActions";


/**
 * Interface for Category attributes
 */
export interface CategoryDTO {
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

  category_children?: CategoryDTO[];
  icon_blob?: BlobDTO;
  actions?: CategoryActionsDTO[];
  category_parent?: CategoryDTO[];
  translation?: TranslationsDTO;
}

