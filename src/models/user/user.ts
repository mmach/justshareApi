'use strict';

import { BlobDTO } from "../blob";
import { ItemDTO } from "../item";
import { UserAuthsDTO } from "./userauth";
import { UserRolesDTO } from "./userRoles";
import { UserTypesDTO } from "./userTypes";

/**
 * Interface for Users attributes
 */
export interface UsersDTO {
  id: string;
  name?: string;
  surname?: string;
  nickname?: string;
  email?: string;
  salt?: string;
  phone?: string;
  birthDate?: Date;
  uid?: string;
  is_authorized?: boolean;
  passwordHash?: string;
  longitude?: number;
  latitude?: number;
  relogin_require?: boolean;
  refresh_token?: string;
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
  user_auths?: UserAuthsDTO[];
  user_type?: UserTypesDTO;
  user_roles?: UserRolesDTO[];
  items?: ItemDTO[];
}
