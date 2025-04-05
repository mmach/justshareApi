import { BaseDBO } from "../../Architecture";
import { InvoiceItemDBO, InvoiceUserDBO, BlobDBO, ItemUserActionDBO } from "../../DBO";




/**
 * Interface for Invoice attributes
 */
export interface InvoiceDBO extends BaseDBO {
  id: string;
  blob_id?: string;
  invoice_user_src_id?: string;
  invoice_user_dest_id?: string;
  iua_id?: string;
  price?: number;
  price_net?: number;
  price_tax?: number;
  tax?: number;
  dueDate?: Date;
  currency?: string;
  title?: string;
  number?: number;
  number_string?: string;
  month?: number;
  year?: number;
  status?: string;
  status_id?: string;
  project_id?: string;
  action_id?: string;

  items?: InvoiceItemDBO[];
  user_src?: InvoiceUserDBO;
  user_dest?: InvoiceUserDBO;
  blob?: BlobDBO;
  iua?: ItemUserActionDBO;
}
