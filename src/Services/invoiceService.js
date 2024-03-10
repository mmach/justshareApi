import { v4 } from "uuid";
import Axios from "../../node_modules/axios/index.js";
import BaseService from "../Architecture/baseService.js";
import { genInvoice } from './../Static/Invoice/invoice.js';
import CONFIG from "../config.js";


/**
 *
 * @export
 * @class ActionService
 * @extends BaseService
 */
export default class InvoiceService extends BaseService {
  /**
   * Creates an instance of UserService.
   * @param   {{ unitOfWorkDI: UnitOfWork, actionPrivilegesRepositoryDI:}}
   */
  constructor({ unitOfWorkDI, blobServiceDI }) {
    super({ unitOfWorkDI, repository: 'invoiceRepository' });
    this.blobServiceDI = blobServiceDI;
  }
  async createInvoice({ model }) {
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
        return (a ? a.price_net : 0) + (b ? b.price_net : 0);
      }, 0),
      price_tax: model.items.reduce(function (a, b) {
        return (a ? a.price_tax : 0) + (b ? b.price_tax : 0)
      }, 0),
      price: model.items.reduce(function (a, b) {
        return (a ? a.price_full_tax : 0) + (b ? b.price_full_tax : 0)

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


  async createInvoiceUser({ model }) {
    await this.unitOfWorkDI.invoiceUserRepository.insert({
      model: {
        ...model

      }, withProject: true
    })
  }

  async genInvoicePDF({ invoice_id }) {

    let invoice = await this.toJsonParse(this.unitOfWorkDI.invoiceRepository.getByInvoiceById({ id: invoice_id, withProject: true }))
    let blob = await this.blobServiceDI.setContext(this.context).getById({ id: this.context.project.blob_logo_ver_id, withProjct: true })
    let img = await Axios.get(`${CONFIG.BLOB_LINK}/blob/` + blob.blob_id)

    let model = {
      ...invoice,
      project: {
        logo: img.data
      },
      invoiceNumber: invoice.number_string,
      dateIssued: invoice.createdAt.toLocaleDateString(),
      dateDue: invoice.dueDate.toLocaleDateString(),
      userFrom: {
        ...invoice.user_src,
        name: invoice.user_src.user_name,
        nip: invoice.user_src.tax_number,
        street: invoice.user_src.address,
        city: invoice.user_src.city,
        zip: invoice.user_src.zip_code,
        country: invoice.user_src.country,


      },
      userTo: {
        ...invoice.user_dest,
        name: invoice.user_dest.user_name,
        nip: invoice.user_dest.tax_number,
        street: invoice.user_dest.address,
        city: invoice.user_dest.city,
        zip: invoice.user_dest.zip_code,
        country: invoice.user_dest.country,
      },
      items: invoice.items
    };
    return await genInvoice(model)



  }




  async getUserInvoices({ iua_id, status, page, size, month, year, asAdmin }) {


    let invoice = await this.toJsonParse(this.unitOfWorkDI.invoiceRepository.getUserInvoices({ iua_id, status, page, size, month, year, asAdmin }))
    //console.log(this.context.project)
    return invoice



  }

}
