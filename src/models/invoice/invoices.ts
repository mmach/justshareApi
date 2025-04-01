

import { BlobDTO } from "../blob";
import { ItemUserActionDTO } from "../item";
import { InvoiceItemDTO } from "./invoicesItems";
import { InvoiceUserDTO } from "./invoicesUsers";

/**
 * Interface for Invoice attributes
 */
export interface InvoiceDTO {
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

  items?: InvoiceItemDTO[];
  user_src?: InvoiceUserDTO;
  user_dest?: InvoiceUserDTO;
  blob?: BlobDTO;
  iua?: ItemUserActionDTO;
}
