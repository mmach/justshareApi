'use strict';

import { BaseDBO } from "../../Architecture/Base/baseDBO";
import { BlobDBO } from "../blob";
import { CategoryDBO } from "../category";
import { ProjectDBO } from "../project";
import { TagDBO } from "../tag";
import { vUserDBO } from "../user";
import { ItemCategoryOptionDBO } from "./itemCategoryOption";
import { ItemCategoryOptionTermDBO } from "./itemCategoryOptionTerm";

/**
 * Interface for Item attributes
 */
export interface ItemDBO extends BaseDBO{
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

  category?: CategoryDBO;
  project?: ProjectDBO;
  blobs?: BlobDBO[];
  user?: vUserDBO;
  itemCategoryOption?: ItemCategoryOptionDBO[];
  tags?: TagDBO[];
  itemCategoryOptionTerms?: ItemCategoryOptionTermDBO[];
}
