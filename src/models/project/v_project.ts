'use strict';

import { BlobDTO } from "../blob";
import { vUserDTO } from "../user";

/**
 * Interface for vProject attributes
 */
export interface vProjectDTO {
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

  logo?: BlobDTO;
  logo_hor?: BlobDTO;
  logo_ver?: BlobDTO;
  img_main?: BlobDTO;
  img_main_phone?: BlobDTO;
  owner?: vUserDTO;
  users?: vUserDTO[];
}
