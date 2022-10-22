import BaseProcess from "../Architecture/baseProcess.js";
import AuthInfrastucture from "../Architecture/Infrastructure/authInfrastucture.js";
import ClosingInfrastructure from "../Architecture/Infrastructure/closingInfrastructure.js";
import DbTransactionInfrastucture from "../Architecture/Infrastructure/dbTransactionInfrastucture.js";
import LogFileInfrastructure from "../Architecture/Infrastructure/logFileInfrastructure.js";
import BlobService from "../Services/blobService.js";
import CategoryService from "../Services/categoryService.js";
import ElasticSearchService from "../Services/elasticSearchService.js";
import ItemService from "../Services/itemService.js";
import updateWithoutStatusIUA from "./commonFunctions/updateWithoutStatusIUA.js";

("use strict");
export default class IUA_UnblockChatProcess extends BaseProcess {
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



  async action() {
    try {
      await updateWithoutStatusIUA.bind(this)(this.process_chain.model.iua_id)
      await this.conversationServiceDI.setContext(this.context).setStatusConversation({ iua_id: this.process_chain.model.iua_id, status: 'O' })
      //  await this.elasticSearchServiceDI.setContext(this.context).addToQueue({ item_id: this.process_chain.model.item_id, operation: 'U' })

      return {
        item_id: this.process_chain.model.item_id,
        item_id: this.process_chain.model.iua_id
      }
    } catch (err) {
      console.log(err)
      throw err;
    }

  }
}
    //  let prom = diff.map(i => {

    //  })
    //  throw 'dupa'













