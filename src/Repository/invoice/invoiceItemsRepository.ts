import { IBaseRepositoryType } from "../../Architecture";
import { InvoiceItemDBO } from "../../DBO";
import { InvoiceItem } from "../../Domain";


export interface IInvoiceItemRepository extends IBaseRepositoryType<InvoiceItemDBO, InvoiceItem> { }

