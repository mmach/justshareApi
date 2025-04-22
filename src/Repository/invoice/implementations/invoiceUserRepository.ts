import { BaseRepositoryType } from "../../../Architecture";
import { InvoiceUserDBO } from "../../../DBO";
import { InvoiceUser } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";
import { IInvoiceUserRepository } from "../invoiceUserRepository";


export default class InvoiceUserRepository  extends BaseRepositoryType<InvoiceUserDBO, InvoiceUser> implements IInvoiceUserRepository {
  sequelizeDI: IMappsDbModels 
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }) {
  
    super(sequelizeDI.InvoiceUser);
    this.sequelizeDI = sequelizeDI;
  }
}


export const InvoiceUserRepositoryPlugin = {
  pluginName: "invoice-user-repository",
  type: 'repository',
  di: 'invoiceUserRepositoryDI',
  classType: InvoiceUserRepository
};