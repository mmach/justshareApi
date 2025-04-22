import { IInvoiceItemRepository } from "./invoiceItemsRepository";
import { IInvoiceRepository } from "./invoiceRepository";
import { IInvoiceUserRepository } from "./invoiceUserRepository";

export type INVOICE_REPOSITORY = {
  invoiceRepositoryDI: IInvoiceRepository;
  invoiceItemRepositoryDI: IInvoiceItemRepository;
  invoiceUserRepositoryDI: IInvoiceUserRepository;
};