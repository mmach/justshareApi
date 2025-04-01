'use strict';

import { BlobDTO } from "../blob";
import { vProjectDTO } from "../project";
import { UserRolesDTO } from "./userRoles";
import { UserTypesDTO } from "./userTypes";

/**
 * Interface for vUser attributes
 */
export interface vUserDTO {
  id: string;
  name?: string;
  nickname?: string;
  surname?: string;
  email?: string;
  phone?: string;
  birthDate?: Date;
  longitude?: number;
  latitude?: number;
  relogin_require?: boolean;
  language?: string;
  blob_id?: string;
  is_admin?: boolean;
  is_root?: boolean;
  zipcode?: string;
  address?: string;
  city_id?: string;
  country_id?: string;
  city?: string;
  project_id?: string;
  usertype_id?: string;
  user_invoice_data_id?: string;

  blob_profile?: BlobDTO;
  user_type?: UserTypesDTO;
  user_roles?: UserRolesDTO[];
  project?: vProjectDTO;
}
