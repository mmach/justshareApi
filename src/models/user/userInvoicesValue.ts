'use strict';

import { UsersDTO } from "./user";

/**
 * Interface for UserInvoiceValue attributes
 */
export interface UserInvoiceValueDTO {
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

  user?: UsersDTO;

}
