import { BaseDBO } from "../../Architecture";
import { BlobDBO, UserAuthsDBO, UserRolesDBO, ItemDBO } from "../../DBO";
import { UserTypesDBO } from "./userTypes";


/**
 * Interface for Users attributes
 */
export interface UsersDBO extends BaseDBO {
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

  blob_profile?: BlobDBO;
  user_auths?: UserAuthsDBO[];
  user_type?: UserTypesDBO;
  user_roles?: UserRolesDBO[];
  items?: ItemDBO[];
}
