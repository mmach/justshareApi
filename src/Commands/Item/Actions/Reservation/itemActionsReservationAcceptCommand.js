import fs from 'fs';
import { DimensionsList, GetValueByDim, LinkItem, StatusesList } from 'justshare-shared';
import { v4 } from "uuid";
import {BaseCommand} from "../../../../Architecture/Base/baseCommand.js";
import {AuthInfrastucture}from "../../../../Architecture/Infrastructure/authInfrastucture.js";
import {ClosingInfrastructure} from "../../../../Architecture/Infrastructure/closingInfrastructure.js";
import {DbTransactionInfrastucture} from "../../../../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import {LogFileInfrastructure} from "../../../../Architecture/Infrastructure/logFileInfrastructure.js";
import BlobService from "../../../../Services/Blobs/blobService.js";
import CategoryService from "../../../../Services/Categories/categoryService.js";
import ElasticSearchService from "../../../../Services/elasticSearchService.js";
import ItemService from "../../../../Services/itemService.js";

("use strict");
export default class ItemActionsReservationAcceptCommand extends BaseCommand {
  /**
    * Creates an instance of CreateItemCommand.
    * @param   {{ logFileInfrastructureDI:LogFileInfrastructure ,
    * authInfrastructureDI:AuthInfrastucture,
    * dbTransactionInfrastuctureDI:DbTransactionInfrastucture,
    * itemServiceDI:ItemService,
    * blobServiceDI:BlobService,
    * categoryServiceDI:CategoryService,
    * elasticSearchServiceDI:ElasticSearchService,
    * tagServiceDI:TagService,
    * closingInfrastructureDI:ClosingInfrastructure}}
    * @memberof CreateItemCommand
    */
  constructor({
    logFileInfrastructureDI,
    authInfrastructureDI,
    dbTransactionInfrastuctureDI,
    itemUserActionServiceDI,
    validationInfrastructureDI,
    closingInfrastructureDI,
    projectInfrastructureDI,
    elasticSearchServiceDI,
    categoryServiceDI,
    categoryOptionServiceDI,
    itemTransactionsServiceDI,
    mailSenderDI,
    userServiceDI,
    conversationServiceDI,
    statusProjectServiceDI,
    dimensionsProjectServiceDI,
    itemServiceDI,
    invoiceServiceDI,
    blobServiceDI

  }) {
    // @ts-ignore
    super({
      logFileInfrastructureDI,
      authInfrastructureDI,
      dbTransactionInfrastuctureDI,
      validationInfrastructureDI,
      closingInfrastructureDI,
      projectInfrastructureDI,
    });
    this.itemUserActionServiceDI = itemUserActionServiceDI;
    this.elasticSearchServiceDI = elasticSearchServiceDI;
    this.itemTransactionsServiceDI = itemTransactionsServiceDI;
    this.mailSenderDI = mailSenderDI
    this.userServiceDI = userServiceDI;
    this.conversationServiceDI = conversationServiceDI
    this.statusProjectServiceDI = statusProjectServiceDI;
    this.dimensionsProjectServiceDI = dimensionsProjectServiceDI;
    this.categoryOptionServiceDI = categoryOptionServiceDI;
    this.categoryServiceDI = categoryServiceDI;
    this.itemServiceDI = itemServiceDI;
    this.invoiceServiceDI = invoiceServiceDI;
    this.blobServiceDI = blobServiceDI;

  }

  get validation() {
    let funcList = [];

    return funcList;
  }
  init(dto) {
    this.model = { ...dto };

  }

  async genInvoice(user_src_id, dest_user_id) {
    let cur = GetValueByDim(DimensionsList.FINAL_PRICE_VALUE, this.itemTransaction, this.context.language).split(' ');
    let statusNew = await this.statusProjectServiceDI.setContext(this.context).getByToken({ name: StatusesList.NEW })
    let user_src = await this.userServiceDI.setContext(this.context).getUserInvoiceData({ user_id: user_src_id });
    let user_dest = await this.userServiceDI.setContext(this.context).getUserInvoiceData({ user_id: dest_user_id });
    let price_net = Number(this.itemTransaction.itemCategoryOption.filter(i => { return i.dim == DimensionsList.FINAL_PRICE_VALUE })[0].value);
    let price_full_tax = Number(this.itemTransaction.itemCategoryOption.filter(i => { return i.dim == DimensionsList.FINAL_PRICE_WITH_TAX_VALUE })[0].value)
    let price_tax = Number(this.itemTransaction.itemCategoryOption.filter(i => { return i.dim == DimensionsList.TAX_PRICE_VALUE })[0].value)
    let invoice_id = await this.invoiceServiceDI.setContext(this.context).createInvoice({
      model: {
        user_src_id: user_src.id,
        user_dest_id: user_dest.id,
        iua_id: this.IUA.id,
        item_id: this.IUA.item_id,
        dueDate: new Date(new Date().getTime() + (10 * 24 * 60 * 60 * 1000)),
        currency: cur[cur.length - 1],
        title: 'Reservation service',
        status: 'N',
        status_id: statusNew.id,
        items: [{
          title: GetValueByDim(DimensionsList.INVOICE_TITLE, this.itemTransaction, this.context.language),
          description: '',
          price_net: price_net,
          currency: cur[cur.length - 1],
          discount: 0,
          price_full_tax: price_full_tax,
          price_tax: price_tax,
          tax: this.itemTransaction.itemCategoryOption.filter(i => { return i.dim == 'TAX' })[0].value * 100,
          amount: 1

        }],
        users: [{
          ...user_dest,
          user_id: this.context.project.user_id,
          user_type: 'D',

        }, {
          ...user_src,
          user_id: this.IUA.user_id,
          user_type: 'S'
        }]
      }
    })

    let invoice = await this.invoiceServiceDI.setContext(this.context).genInvoicePDF({ invoice_id: invoice_id })
    let blob_id = v4();
    let content = await fs.readFileSync(invoice.invoicePath, { encoding: 'base64' });

    let createBlobResult = await this.blobServiceDI.setContext(this.context).uploadUserProject({
      blob: {
        id: blob_id,
        uid: blob_id,
        type: "application/pdf",
        blob: content

      },
    });

    //#region mail sender
    console.log(content)

    await this.invoiceServiceDI.setContext(this.context).update({
      model: {
        blob_id: createBlobResult.dataValues.id,
        id: invoice_id
      }, withProject: true
    })


    await this.mailSenderDI.setContext(this.context).mailSend({
      type: 'NEW_INVOICE',
      model: {
        ...invoice,
        blob_id: createBlobResult.dataValues.blob_id,
      },
      email_to: user_src.user.email,
      language: user_src.user.language,
      attachments: [
        { 'filename': 'invoice.pdf', 'content': content }
      ]
    });

    await this.mailSenderDI.setContext(this.context).mailSend({
      type: 'NEW_INVOICE',
      model: {
        ...invoice,
        blob_id: createBlobResult.dataValues.blob_id,
      },
      email_to: user_dest.user.email,
      language: user_dest.user.language,
      attachments: [
        { 'filename': 'invoice.pdf', 'content': content }
      ]
    });
    fs.unlinkSync(invoice.invoicePath);

  }

  async updateReservationItemSync() {
    let start = GetValueByDim(DimensionsList.RESERVATION_DAYS_START, this.itemTransaction, this.context.language)
    let end = GetValueByDim(DimensionsList.RESERVATION_DAYS_END, this.itemTransaction, this.context.language)
    let ico = this.itemTransaction.itemCategoryOption.filter(i => { return i.dim == DimensionsList.RESERVATION_DAYS_START })[0]

    let obj = await this.itemServiceDI.setContext(this.context).isFreeTerm({
      model: {
        item_id: this.IUA.item_id,
        start_date: start,
        end_date: end,
        dim_id: this.dimensions.filter(i => { return i.name == DimensionsList.RESERVATION_DAYS })[0].id,
      }
    })
    if (obj.length > 0) {
      throw 'NOT FREE TERMS'
    }


    await this.itemServiceDI.setContext(this.context).addCategoryOptionTerm({
      model: {
        id: v4(),
        iua_id: this.IUA.id,
        item_id: this.IUA.item_id,
        start_date: start,
        end_date: end,
        dim_id: this.dimensions.filter(i => { return i.name == DimensionsList.RESERVATION_DAYS })[0].id,
        col_id: ico.col_id,
        co_id: ico.category_link.co_id
        // co_id:ico.
      }
    })
    await this.elasticSearchServiceDI.setContext(this.context).addToQueue({ item_id: this.IUA.item_id, operation: 'U' })

  }

  async initIUAProcess() {
    this.IUA = await this.itemUserActionServiceDI.setContext(this.context).getById({ id: this.model.iua_id, withProject: true })
    let itemTransaction = await this.itemTransactionsServiceDI.setContext(this.context).getItemTransaction({ iua_id: [this.IUA.id], status_id: undefined });
    itemTransaction[0].categories = await this.categoryServiceDI.setContext(this.context).getCategoriesParents({ ids: itemTransaction[0].category.id })
    this.itemTransaction = itemTransaction[0]
    let ids = this.itemTransaction.categories.map(item => { return item.id });
    this.catOptions = await this.categoryOptionServiceDI.setContext(this.context).getRelatedOptions({ category_ids: ids });
    this.dimensions = await this.dimensionsProjectServiceDI.setContext(this.context).getDimensionsFlat({});
    this.itemTransaction = LinkItem(this.itemTransaction, this.catOptions, null, this.dimensions, this.context.language)
  }

  async updateIUA(user_id, satusName, user_src, user_dest) {
    let status = await this.statusProjectServiceDI.setContext(this.context).getByToken({ name: satusName })
    let id = v4();
    await this.itemUserActionServiceDI.setContext(this.context).insert({
      model: {
        ...this.IUA,
        id: id,
        iua_id: this.IUA.id,
      }, withProject: true,
    })
    await this.itemUserActionServiceDI.setContext(this.context).update({
      model: {
        ...this.IUA,
        comment: this.model.message,
        user_id: user_id,
        status: 'W',
        iua_prev_id: id,
        status_id: status.id,
        created_date: new Date()

      }, withProject: true
    })

    await this.conversationServiceDI.setContext(this.context).sendMessageToUser({ iua_id: this.IUA.id, msg_id: this.model.msg_id, msg: this.model.message, syncSocket: true });

    await this.mailSenderDI.setContext(this.context).mailSend({
      type: 'CHANGE_IUA_STATUS',
      model: {
        iua_nr: this.IUA.uniq_number,
        iua_id: this.IUA.id,
        comment: this.model.message,
        status: status.translation[user_src.language],
      },
      email_to: user_src.email,
      language: user_src.language,
    });


    await this.mailSenderDI.setContext(this.context).mailSend({
      type: 'CHANGE_IUA_STATUS',
      model: {
        iua_nr: this.IUA.uniq_number,
        iua_id: this.IUA.id,
        comment: this.model.message,
        status: status.translation[this.context.language],
      },
      email_to: user_dest.email,
      language: user_dest.language,
    });

    await this.itemTransactionsServiceDI.setContext(this.context).setStatus({ iua_id: this.IUA.id, status_id: status.id });

  }
  async action() {
    try {

      await this.initIUAProcess();

      await this.updateReservationItemSync()

      await this.genInvoice(this.IUA.user_id, this.context.project.user_id)
      let dest_user = await this.userServiceDI.setContext(this.context).getById({ id: this.IUA.user_id, project: this.context.project.id });
      await this.updateIUA(this.context.user.id, StatusesList.WAITING_FOR_PAY, this.context.user, dest_user)


    } catch (err) {
      console.log(err)
      throw err;
    }

  }
}
  //  let prom = diff.map(i => {

  //  })
  //  throw 'dupa'






