import BaseCommand from "../../../../Architecture/baseCommand.js";
import AuthInfrastucture from "../../../../Architecture/Infrastructure/authInfrastucture.js";
import ClosingInfrastructure from "../../../../Architecture/Infrastructure/closingInfrastructure.js";
import DbTransactionInfrastucture from "../../../../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import LogFileInfrastructure from "../../../../Architecture/Infrastructure/logFileInfrastructure.js";
import BlobService from "../../../../Services/blobService.js";
import CategoryService from "../../../../Services/categoryService.js";
import ElasticSearchService from "../../../../Services/elasticSearchService.js";
import ItemService from "../../../../Services/itemService.js";
import { uuid } from "../../../../../node_modules/uuidv4/build/lib/uuidv4.js";
import { LinkItem, GetValueByDim, DimensionsList, StatusesList } from 'justshare-shared'

import { genInvoice } from './../../../../Static/Invoice/invoice.js'
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
    invoiceServiceDI

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
    this.invoiceServiceDI = invoiceServiceDI
  }

  get validation() {
    let funcList = [];

    return funcList;
  }
  init(dto) {
    this.model = { ...dto };

  }


  async action() {
    try {
      /* await this.mailSenderDI.setContext(this.context).mailSend({
         type: 'RESERVATION_SOURCE_MAIL',
         model: model,
         email_to: this.context.user.email,
         language: this.context.language
       });*/
      //let transalte = await this.translationServiceDI.setContext(this.context).getTokens({ code: 'LABEL', token: 'RESERVATION_MESSAGE_TITLE' })
      let IUA = await this.itemUserActionServiceDI.setContext(this.context).getById({ id: this.model.iua_id, withProject: true })
      let status = await this.statusProjectServiceDI.setContext(this.context).getByToken({ name: StatusesList.ACCEPTED })
      let itemTransaction = await this.itemTransactionsServiceDI.setContext(this.context).getItemTransaction({ iua_id: [IUA.id], status_id: undefined });

      itemTransaction[0].categories = await this.categoryServiceDI.setContext(this.context).getCategoriesParents({ ids: itemTransaction[0].category.id })
      let ids = itemTransaction[0].categories.map(item => { return item.id });
      let catOptions = await this.categoryOptionServiceDI.setContext(this.context).getRelatedOptions({ category_ids: ids });
      let dimensions = await this.dimensionsProjectServiceDI.setContext(this.context).getDimensionsFlat({});


      let res = LinkItem(itemTransaction[0], catOptions, null, dimensions, this.context.language)
      let ico = res.itemCategoryOption.filter(i => { return i.dim == DimensionsList.RESERVATION_DAYS_START })[0]
      let start = GetValueByDim(DimensionsList.RESERVATION_DAYS_START, res, this.context.language)
      let end = GetValueByDim(DimensionsList.RESERVATION_DAYS_END, res, this.context.language)
      let cur = GetValueByDim(DimensionsList.FINAL_PRICE_VALUE, res, this.context.language).split(' ');
      let user_src = await this.userServiceDI.setContext(this.context).getUserInvoiceData({ user_id: IUA.user_id });
      let user_dest = await this.userServiceDI.setContext(this.context).getUserInvoiceData({ user_id: this.context.project.user_id });

      let invoice_id = await this.invoiceServiceDI.setContext(this.context).createInvoice({
        model: {
          user_src_id: user_src.id,
          user_dest_id: user_dest.id,
          iua_id: IUA.id,
          item_id: IUA.item_id,
          //  price_net: res.itemCategoryOption.filter(i => { return i.dim == DimensionsList.FINAL_PRICE_VALUE })[0].value,
          dueDate: new Date(new Date().getTime() + (10 * 24 * 60 * 60 * 1000)),
          currency: cur[cur.length - 1],
          title: 'Reservation service',
          status: 'N',
          items: [{
            title: GetValueByDim(DimensionsList.INVOICE_TITLE, res, this.context.language),
            description: '',
            price_net: Number(res.itemCategoryOption.filter(i => { return i.dim == DimensionsList.FINAL_PRICE_VALUE })[0].value),
            currency: cur[cur.length - 1],
            discount: 0,
            price_full_tax: Number(res.itemCategoryOption.filter(i => { return i.dim == DimensionsList.FINAL_PRICE_WITH_TAX_VALUE })[0].value),
            price_tax: Number(res.itemCategoryOption.filter(i => { return i.dim == DimensionsList.TAX_PRICE_VALUE })[0].value),
            tax: res.itemCategoryOption.filter(i => { return i.dim == 'TAX' })[0].value * 100,
            amount: 1

          }],
          users: [{
            ...user_dest,
            user_type: 'D',

          }, {
            ...user_src,
            user_type: 'S'
          }]


        }
      })

      await this.invoiceServiceDI.setContext(this.context).genInvoicePDF({ invoice_id: invoice_id })
      let obj = await this.itemServiceDI.setContext(this.context).isFreeTerm({
        model: {
          item_id: IUA.item_id,
          start_date: start,
          end_date: end,
          dim_id: dimensions.filter(i => { return i.name == DimensionsList.RESERVATION_DAYS })[0].id,
        }
      })
      if (obj.length > 0) {
        throw 'NOT FREE TERMS'
      }


      await this.itemServiceDI.setContext(this.context).addCategoryOptionTerm({
        model: {
          id: uuid(),
          iua_id: IUA.id,
          item_id: IUA.item_id,
          start_date: start,
          end_date: end,
          dim_id: dimensions.filter(i => { return i.name == DimensionsList.RESERVATION_DAYS })[0].id,
          col_id: ico.col_id,
          co_id: ico.category_link.co_id
          // co_id:ico.
        }
      })
      let id = uuid();
      await this.itemUserActionServiceDI.setContext(this.context).insert({
        model: {
          ...IUA,
          id: id,
          iua_id: IUA.id,
        }, withProject: true,
      })
      await this.itemUserActionServiceDI.setContext(this.context).update({
        model: {
          ...IUA,
          comment: this.model.message,
          user_id: this.context.user.id,
          status: 'A',
          iua_prev_id: id,
          status_id: status.id
        }, withProject: true
      })
      await this.conversationServiceDI.setContext(this.context).sendMessageToUser({ iua_id: IUA.id, msg_id: this.model.msg_id, msg: this.model.message, syncSocket: true });

      status = await this.statusProjectServiceDI.setContext(this.context).getByToken({ name: StatusesList.WAITING_FOR_PAY })
      id = uuid();
      await this.itemUserActionServiceDI.setContext(this.context).insert({
        model: {
          ...IUA,
          id: id,
          iua_id: IUA.id,
        }, withProject: true,
      })
      await this.itemUserActionServiceDI.setContext(this.context).update({
        model: {
          ...IUA,
          comment: this.model.message,
          user_id: this.context.user.id,
          status: 'W',
          iua_prev_id: id,
          status_id: status.id
        }, withProject: true
      })
      await this.itemTransactionsServiceDI.setContext(this.context).setStatus({ iua_id: IUA.id, status_id: status.id });
      await this.elasticSearchServiceDI.setContext(this.context).addToQueue({ item_id: IUA.item_id, operation: 'U' })

    } catch (err) {
      console.log(err)
      throw err;
    }

  }   //await Promise.all(prom)
}
  //  let prom = diff.map(i => {

  //  })
  //  throw 'dupa'






