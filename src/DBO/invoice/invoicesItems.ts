import { BaseDBO } from "../../Architecture/Base/baseDBO";


/**
 * Interface for InvoiceItem attributes
 */
export interface InvoiceItemDBO extends BaseDBO{
  id: string;
  price?: number;
  price_net?: number;
  price_tax?: number;
  tax?: number;
  amount?: number;
  currency?: string;
  title?: string;
  project_id?: string;
}
