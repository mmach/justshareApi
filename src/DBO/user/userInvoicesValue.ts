'use strict';

import { BaseDBO } from "../../Architecture/Base/baseDBO";
import { UsersDBO } from "./user";

/**
 * Interface for UserInvoiceValue attributes
 */
export interface UserInvoiceValueDBO extends BaseDBO{
  id: string;
  name?: string;
  address?: string;
  tax_number?: string;
  country?: string;
  city?: string;
  zip_code?: string;
  user_name?: string;
  bank_account_nr?: string;
  project_id?: string;

  user?: UsersDBO;

}
