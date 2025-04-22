import { BaseRepositoryType } from "../../../Architecture";
import { InvoiceItemDBO } from "../../../DBO";
import { InvoiceItem } from "../../../Domain";
import { IMappsDbModels } from "../../../Domain/models";
import { IInvoiceItemRepository } from "../invoiceItemsRepository";



export default class InvoiceItemRepository extends BaseRepositoryType<InvoiceItemDBO, InvoiceItem> implements IInvoiceItemRepository {
  sequelizeDI: IMappsDbModels
  constructor({ sequelizeDI }: { sequelizeDI: IMappsDbModels }) {
    super(sequelizeDI.InvoiceItem);
    this.sequelizeDI = sequelizeDI;
  }
}


export const InvoiceItemRepositoryPlugin = {
  pluginName: "invoice-item-repository",
  type: 'repository',
  di: 'invoiceItemRepositoryDI',
  classType: InvoiceItemRepository
};