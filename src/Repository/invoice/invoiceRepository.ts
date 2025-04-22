import { IBaseRepositoryType } from "../../Architecture";
import { InvoiceDBO } from "../../DBO";
import { Invoice } from "../../Domain";

export interface IInvoiceRepository extends IBaseRepositoryType<InvoiceDBO, Invoice> {
  getByInvoiceById({ id, transaction }: { id: string; transaction?: number }): Promise<Invoice | null>;
  getUserInvoices({
    iua_id,
    status,
    page,
    size,
    asAdmin,
    month,
    year,
    transaction
  }: {
    iua_id?: string;
    status?: string;
    page: number;
    size: number;
    asAdmin?: boolean;
    month?: number;
    year?: number;
    transaction?: number;
  }): Promise<Invoice[]>;
}
