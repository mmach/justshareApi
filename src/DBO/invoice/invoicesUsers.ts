import { BaseDBO } from "../../Architecture/Base/baseDBO";


/**
 * Interface for InvoiceUser attributes
 */
export interface InvoiceUserDBO extends BaseDBO{
  id: string;
  name?: string;
  address?: string;
  tax_number?: string;
  country?: string;
  city?: string;
  zip_code?: string;
  user_name?: string;
  bank_account_nr?: string;
  user_type?: string;
  project_id?: string;
  user_id?: string;
}
