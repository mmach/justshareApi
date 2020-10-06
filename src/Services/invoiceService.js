import BaseService from "../Architecture/baseService.js";
import fs from "fs-extra";
import ServerException from "../Architecture/Exceptions/serverException.js";
import CONFIG from "../config.js";
import uuidv4 from "uuid/v4";
import { genInvoice } from './../Static/Invoice/invoice.js'
import Axios from "../../node_modules/axios/index.js";
import btoa from 'btoa'
import { uuid } from "uuidv4";


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
    src.id = uuid()
    let dest = model.users.filter(i => { return i.user_type == 'D' })[0]
    dest.id = uuid()
    await this.createInvoiceUser({ model: src })

    await this.createInvoiceUser({ model: dest })


    let invocie_id = uuid()
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
    console.log('co_tu_sie_dzieje')

    await this.unitOfWorkDI.invoiceRepository.insert({
      model: obj, withProject: true
    })
    console.log('to jest kruwa tu')
    let bi = model.items.map(i => {
      return {
        ...i,
        id: uuid(),
        price: i.price_full_tax,
        invoice_id: invocie_id
      }
    })
    console.log(bi)
    await this.unitOfWorkDI.invoiceItemRepository.bulkInsert({ model: bi, withProject: true })

    console.log('wtef')
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
    console.log(invoice)
    //console.log(this.context.project)
    let blob = await this.blobServiceDI.setContext(this.context).getById({ id: this.context.project.blob_logo_ver_id, withProjct: true })
    let img = await Axios.get(`https://api.mapps.io/blob/` + blob.blob_id)
    //console.log(img.data)
    //console.log(img)
    //console.log(img)
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
    console.log(invoice)
    //console.log(this.context.project)
    return invoice



  }

}
