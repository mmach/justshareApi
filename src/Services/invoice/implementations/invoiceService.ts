import Axios from "axios";
import { v4 } from "uuid";
import { BaseServiceType } from "../../../Architecture";
import CONFIG from "../../../config";
import { InvoiceDBO, InvoiceUserDBO, InvoiceItemDBO } from "../../../DBO";
import { DI } from "../../../diTypes";
import { Invoice } from "../../../Domain";
import { genInvoice } from "../../../Processes/commonFunctions";
import { IBlobService } from "../../blob";
import { IInvoiceService } from "../invoiceService";

export default class InvoiceService extends BaseServiceType<InvoiceDBO, Invoice> implements IInvoiceService {
  blobServiceDI: IBlobService;
  constructor({ unitOfWorkDI, blobServiceDI }: DI & { blobServiceDI: IBlobService }) {
    super({ unitOfWorkDI, repository: 'invoiceRepository' });
    this.blobServiceDI = blobServiceDI;
  }

  async createInvoice({ model }: { model: InvoiceDBO & { users: InvoiceUserDBO[], items: InvoiceItemDBO & { price_full_tax: number }[] } }): Promise<string> {
    let src = model.users.filter(i => { return i.user_type == 'S' })[0]
    src.id = v4()
    let dest = model.users.filter(i => { return i.user_type == 'D' })[0]
    dest.id = v4()
    await this.createInvoiceUser({ model: src })
    await this.createInvoiceUser({ model: dest })

    let invocie_id = v4()
    let obj = {
      ...model,
      price_net: model.items.reduce(function (a, b) {
        return a + (b ? b.price_net! : 0);
      }, 0),
      price_tax: model.items.reduce(function (a, b) {
        return a + (b ? b.price_tax! : 0)
      }, 0),
      price: model.items.reduce(function (a, b) {
        return a + (b ? b.price_full_tax! : 0)

      }, 0),
      id: invocie_id,
      invoice_user_src_id: src.id,
      invoice_user_dest_id: dest.id,
    }

    await this.unitOfWorkDI.invoiceRepository.insert({
      model: obj, withProject: true
    })
    let bi = model.items.map(i => {
      return {
        ...i,
        id: v4(),
        price: i.price_full_tax,
        invoice_id: invocie_id
      }
    })
    await this.unitOfWorkDI.invoiceItemRepository.bulkInsert({ model: bi, withProject: true })
    return invocie_id
  }


  async createInvoiceUser({ model }: { model: InvoiceUserDBO }): Promise<void> {
    await this.unitOfWorkDI.invoiceUserRepository.insert({
      model: {
        ...model
      }, withProject: true
    })
  }

  async genInvoicePDF({ invoice_id }: { invoice_id: string }): Promise<any> {

    let invoice = (await this.toJsonParse<InvoiceDBO>(this.unitOfWorkDI.invoiceRepository.getByInvoiceById({ id: invoice_id })))!;
    let blob = await this.blobServiceDI.setContext(this.context).getById({ id: this.context.project.blob_logo_ver_id, withProject: true })
    let img = await Axios.get(`${CONFIG.BLOB_LINK}blob/` + blob.blob_id)

    let model = {
      ...invoice,
      project: {
        logo: img.data
      },
      invoiceNumber: invoice.number_string,
      dateIssued: invoice.createdAt!.toLocaleDateString(),
      dateDue: invoice.dueDate!.toLocaleDateString(),
      userFrom: {
        ...invoice.user_src,
        name: invoice.user_src!.user_name,
        nip: invoice.user_src!.tax_number,
        street: invoice.user_src!.address,
        city: invoice.user_src!.city,
        zip: invoice.user_src!.zip_code,
        country: invoice.user_src!.country,
      },
      userTo: {
        ...invoice.user_dest,
        name: invoice.user_dest!.user_name,
        nip: invoice.user_dest!.tax_number,
        street: invoice.user_dest!.address,
        city: invoice.user_dest!.city,
        zip: invoice.user_dest!.zip_code,
        country: invoice.user_dest!.country,
      },
      items: invoice.items
    };
    return await genInvoice(model)
  }

  async getUserInvoices({ iua_id, status, page, size, month, year, asAdmin }: { iua_id: string, status: string, page: number, size: number, month: number, year: number, asAdmin: boolean }): Promise<InvoiceDBO[]> {
    let invoice = await this.toJsonParse<InvoiceDBO[]>(this.unitOfWorkDI.invoiceRepository.getUserInvoices({ iua_id, status, page, size, month, year, asAdmin }))
    return invoice!
  }

}


export const InvoiceServicePlugin = {
  pluginName: "invoice-service",
  type: "service",
  di: "invoiceServiceDI",
  classType: InvoiceService,
};