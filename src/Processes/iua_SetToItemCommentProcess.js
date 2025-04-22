import { v4 } from "uuid";
import BaseProcess from "../Architecture/Base/baseProcess.js";
import {AuthInfrastucture}from "../Architecture/Infrastructure/authInfrastucture.js";
import {ClosingInfrastructure} from "../Architecture/Infrastructure/closingInfrastructure.js";
import {DbTransactionInfrastucture} from "../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import {LogFileInfrastructure} from "../Architecture/Infrastructure/logFileInfrastructure.js";
import BlobService from "../Services/Blobs/implementations/blobService.js";
import CategoryService from "../Services/Categories/categoryService.js";
import ElasticSearchService from "../Services/elasticSearchService.js";
import ItemService from "../Services/itemService.js";
import initIUAProcess from "./commonFunctions/initIUAProcess.js";
import updateIUA from "./commonFunctions/updateIUA.js";

("use strict");
export default class IUA_SetToItemCommentProcess extends BaseProcess {
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
    blobServiceDI,
    commentServiceDI

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
    this.commentServiceDI = commentServiceDI

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

      await initIUAProcess.bind(this)();
      let dest_user = await this.userServiceDI.setContext(this.context).getById({ id: this.IUA.user_id, project: this.context.project.id });
      await updateIUA.bind(this)(this.context.user.id, this.context.user, dest_user)

      await this.commentServiceDI.setContext(this.context).insert({
        model: {
          id: v4(),
          user_src_id: this.context.user.id,
          iua_id: this.IUA.id,
          item_id: this.IUA.item_id,
          comment: this.model.message,
          rate: this.model.rate,
          action_id: this.IUA.action_id,
          status: 'P'
        }
        , withProject: true
      })

    } catch (err) {
      console.log(err)
      throw err;
    }

  }
}
    //  let prom = diff.map(i => {

    //  })
    //  throw 'dupa'













