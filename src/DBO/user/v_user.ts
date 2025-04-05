'use strict';

import { BaseDBO } from "../../Architecture/Base/baseDBO";
import { BlobDBO } from "../blob";
import { vProjectDBO } from "../project";
import { UserRolesDBO } from "./userRoles";
import { UserTypesDBO } from "./userTypes";

/**
 * Interface for vUser attributes
 */
export interface vUserDBO extends BaseDBO{
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

  blob_profile?: BlobDBO;
  user_type?: UserTypesDBO;
  user_roles?: UserRolesDBO[];
  project?: vProjectDBO;
}
