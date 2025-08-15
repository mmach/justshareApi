import { IBaseServiceType } from "../../Architecture";
import { InvoiceDBO, InvoiceUserDBO, InvoiceItemDBO } from "../../DBO";
import { Invoice } from "../../Domain";

export interface IInvoiceService extends IBaseServiceType<InvoiceDBO, Invoice> {
  createInvoice(params: {
    model: InvoiceDBO & {
      users: InvoiceUserDBO[];
      items: InvoiceItemDBO & { price_full_tax: number }[];
    };
  }): Promise<string>;

  createInvoiceUser(params: { model: InvoiceUserDBO }): Promise<void>;

  genInvoicePDF(params: { invoice_id: string }): Promise<any>;

  getUserInvoices(params: {
    iua_id: string;
    status: string;
    page: number;
    size: number;
    month: number;
    year: number;
    asAdmin: boolean;
  }): Promise<InvoiceDBO[]>;
}
