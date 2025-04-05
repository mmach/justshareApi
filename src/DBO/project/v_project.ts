'use strict';

import { BaseDBO } from "../../Architecture/Base/baseDBO";
import { BlobDBO } from "../blob";
import { vUserDBO } from "../user";

/**
 * Interface for vProject attributes
 */
export interface vProjectDBO extends BaseDBO{
  id: string;
  name?: string;
  project_id?: string;
  categories_from_parent?: boolean;
  theme_color?: string;
  root_category_id?: string;
  item_to_parent?: boolean;
  logo_url?: string;
  status?: boolean;
  base_url?: string;
  contact_mail?: string;
  blob_logo_id?: string;
  blob_logo_hor_id?: string;
  blob_logo_ver_id?: string;
  blob_main_id?: string;
  description?: string;
  user_id?: string;
  plan_id?: string;
  auth_url?: string;
  blob_main_phone_id?: string;

  logo?: BlobDBO;
  logo_hor?: BlobDBO;
  logo_ver?: BlobDBO;
  img_main?: BlobDBO;
  img_main_phone?: BlobDBO;
  owner?: vUserDBO;
  users?: vUserDBO[];
}
