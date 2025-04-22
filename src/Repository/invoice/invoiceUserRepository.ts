import { IBaseRepositoryType } from "../../Architecture";
import { InvoiceUserDBO } from "../../DBO";
import { InvoiceUser } from "../../Domain";

export interface IInvoiceUserRepository extends IBaseRepositoryType<InvoiceUserDBO, InvoiceUser> {}
