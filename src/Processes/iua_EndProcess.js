import BaseCommand from "../Architecture/baseCommand.js";
import AuthInfrastucture from "../Architecture/Infrastructure/authInfrastucture.js";
import ClosingInfrastructure from "../Architecture/Infrastructure/closingInfrastructure.js";
import DbTransactionInfrastucture from "../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import LogFileInfrastructure from "../Architecture/Infrastructure/logFileInfrastructure.js";
import BlobService from "../Services/blobService.js";
import CategoryService from "../Services/categoryService.js";
import ElasticSearchService from "../Services/elasticSearchService.js";
import { uuid } from "../../node_modules/uuidv4/build/lib/uuidv4.js";
import { LinkItem, GetValueByDim, DimensionsList, StatusesList } from 'justshare-shared'
import fs from 'fs';
import ItemService from "../Services/itemService.js";
import BaseProcess from "../Architecture/baseProcess.js";

("use strict");
export default class IUA_EndProcess extends BaseProcess {
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

  async updateIUA(user_id, user_src, user_dest) {
    let id = uuid();
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
        status_id: this.process_chain.status_id,
        process_chain_id: this.process_chain.id,

        created_date: new Date()

      }, withProject: true
    })

    await this.conversationServiceDI.setContext(this.context).sendMessageToUser({ iua_id: this.IUA.id, msg_id: uuid(), msg: this.model.message, syncSocket: true });

    let status = await this.statusProjectServiceDI.setContext(this.context).getByStatusId({ id: this.process_chain.status_id })
    if (this.process_chain.with_notification == true) {

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
    }

  }
  
  async action() {
    try {

      await this.initIUAProcess();

      //await this.updateReservationItemSync()


      let dest_user = await this.userServiceDI.setContext(this.context).getById({ id: this.IUA.user_id, project: this.context.project.id });
      await this.updateIUA(this.context.user.id, this.context.user, dest_user)


    } catch (err) {
      console.log(err)
      throw err;
    }

  }
}
    //  let prom = diff.map(i => {

    //  })
    //  throw 'dupa'













