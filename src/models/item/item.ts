'use strict';

import { BlobDTO } from "../blob/blob";
import { CategoryDTO } from "../category/category";
import { ProjectDTO } from "../project/project";
import { TagDTO } from "../tag/tag";
import { vUserDTO } from "../user/v_user";
import { ItemCategoryOptionDTO } from "./itemCategoryOption";
import { ItemCategoryOptionTermDTO } from "./itemCategoryOptionTerm";

/**
 * Interface for Item attributes
 */
export interface ItemDTO {
  id: string;
  name?: string;
  description?: string;
  user_id?: string;
  blob_id?: string;
  category_id?: string;
  clobSearch_pl?: string;
  clobSearch_us?: string;
  clobSearch_de?: string;
  clobSearch_fr?: string;
  clobSearch_ru?: string;
  clobSearch_no?: string;
  clobSearch_es?: string;
  clobSearch_zh_cn?: string;
  process_id?: string;
  process_chain_id?: string;
  process_updated_date?: Date;
  longitude?: number;
  latitude?: number;
  category_type?: number;
  is_elastic_sync?: boolean;
  expired_date?: Date;
  project_id?: string;
  es_operations?: string;
  external_id?: string;
  item_process_id?: string;

  category?: CategoryDTO;
  project?: ProjectDTO;
  blobs?: BlobDTO[];
  user?: vUserDTO;
  itemCategoryOption?: ItemCategoryOptionDTO[];
  tags?: TagDTO[];
  itemCategoryOptionTerms?: ItemCategoryOptionTermDTO[];
}
